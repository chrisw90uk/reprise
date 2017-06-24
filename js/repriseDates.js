app.controller("editDates",function($scope, $http){
	
	$scope.editingDate = {};
	$scope.editing = false;
	
	$http.get("ctrl/current-dates.php").then(function(response){
		$scope.currentDates = response.data;
		console.log("retrieved");
	})
	
	$scope.addDate = function(){
		console.log("submitted");
		var formData = JSON.stringify($scope.date);
		$http({
			method: 'POST',
			url: 'ctrl/add-date.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			alert(response.data);
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
			});
		})
	}	
	
	$scope.editDate = function(item){
		$scope.editing = true;
		$scope.editingDate = item;
	}
	
	$scope.saveDate = function(id){
		var formData = JSON.stringify($scope.editingDate);
		$http({
			method: 'POST',
			url: 'ctrl/edit-date.php?id=' + id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			alert(response.data);
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
				$scope.editing = false;
			});
		})
	}
	
	$scope.deleteDate = function(id){
		$http.post('ctrl/delete-date.php?id=' + id).then(function(response){
			alert(response.data);
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
			})
		});
	}
	
	$scope.closePopup = function(){
		$scope.editing = false;
	}
	
});