app.controller('editLayout', editLayout);

function editLayout($http, $timeout, status){
	var vm = this;
	vm.sections = [];
	vm.edits = false;
	vm.moveUp = moveUp;
	vm.moveDown = moveDown;
	vm.discardChanges = discardChanges;
	vm.saveChanges = saveChanges;

	function activate(){
		$http.get("ctrl/get-layout.php").then(function(response){
			vm.sections = response.data;
			vm.sections.sort(resultsOrder);
		});
	}

	activate();

	function resultsOrder(a, b){
	  	if (a.index < b.index){
		    return -1;
		}
		if (a.index > b.index){
		    return 1;
		}
		return 0;
	}

	function moveUp(section){
		var pos = section.index;
		vm.sections.splice(pos - 1, 0, vm.sections.splice(pos, 1)[0]);
		angular.forEach(vm.sections, function(value, key){
			value.index = key;
		});
		if(!vm.edits){
			vm.edits = true;
		}
	}
	function moveDown(section){
		var pos = section.index;
		vm.sections.splice(pos + 1, 0, vm.sections.splice(pos, 1)[0]);
		angular.forEach(vm.sections, function(value, key){
			value.index = key;
		});
		if(!vm.edits){
			vm.edits = true;
		}
	}
	function discardChanges(){
		$http.get("ctrl/get-layout.php").then(function(response){
			vm.sections = response.data;
			vm.sections.sort(resultsOrder);
		});
		vm.edits = false;
	}
	function saveChanges(){
		console.log("saving...")
		var data = JSON.stringify(vm.sections);
		vm.status = status.show();
		$http({
			method: 'POST',
			url: 'ctrl/save-layout.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			vm.success = response.data;
			vm.status = status.complete();
			$timeout(function(){
				vm.status = status.hide();
			},3000);
		})
	}

}