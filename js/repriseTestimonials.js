app.controller('editTestimonials', editTestimonials);

function editTestimonials($http, $timeout, status){
	var vm = this;
	vm.testimonials = [];
	vm.testimonial = {};
	vm.editing = {};
	vm.popupActive = false;
	vm.newItem = false;
	vm.editItem = false;
	vm.addTestimonial = addTestimonial;
	vm.saveTestimonial = saveTestimonial;
	vm.editTestimonial = editTestimonial;
	vm.deleteTestimonial = deleteTestimonial;
	vm.saveChanges = saveChanges;

	function activate(){
		$http.get("ctrl/get-testimonials.php").then(function(response){
			vm.testimonials = response.data;
		});
	}

	activate();

	function addTestimonial(){
		vm.popupActive = true;
		vm.editItem = false;
		vm.newItem = true;
	}
	function editTestimonial(item){
		vm.editing = item;
		vm.popupActive = true;
		vm.newItem = false;
		vm.editItem = true;
	}

	function saveTestimonial(){
		var data = JSON.stringify(vm.testimonial);
		vm.status = status.show();
		$http({
			method: 'POST',
			url: 'ctrl/add-testimonial.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			vm.success = response.data;
			vm.status = status.complete();
			vm.testimonial = {};
			activate();
			vm.popupActive = false;
			$timeout(function(){
				vm.status = status.hide();
			},3000);
		})
	}

	function saveChanges(){
		var data = JSON.stringify(vm.editing);
		vm.status = status.show();
		console.log("saving");
		$http({
			method: 'POST',
			url: 'ctrl/edit-testimonial.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			vm.success = response.data;
			vm.status = status.complete();
			vm.popupActive = false;
			activate();
			$timeout(function(){
				vm.status = status.hide();
			},3000);
		})
	}

	function deleteTestimonial(id){
		var choice = confirm("Are you sure you want to delete this item?");
		if(choice==true){
			vm.status = status.show();
			$http.post('ctrl/delete-testimonial.php?id=' + id).then(function(response){
				vm.success = response.data;
				vm.status = status.complete();
				activate();
				$timeout(function(){
					vm.status = status.hide();
				},3000);
			});
		}
	}
	
}