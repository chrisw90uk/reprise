app.controller('editTestimonials', editTestimonials);

function editTestimonials($http, $timeout, status){
	var vm = this;
	vm.testimonials = [];
	vm.testimonial = {};
	vm.popupActive = false;
	vm.newItem = false;
	vm.addTestimonial = addTestimonial;
	vm.saveTestimonial = saveTestimonial;

	function activate(){
		$http.get("ctrl/get-testimonials.php").then(function(response){
			vm.testimonials = response.data;
		});
	}

	activate();

	function addTestimonial(){
		vm.popupActive = true;
		vm.newItem = true;
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
			vm.popupActive = false;
			$timeout(function(){
				vm.status = status.hide();
			},3000);
		})
	}
	
}