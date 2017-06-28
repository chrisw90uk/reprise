app.controller("editDates",function($scope, $http, $timeout){
	
	$scope.editingDate = {};
	$scope.editing = false;
	$scope.httpReq = false;
	
	$http.get("ctrl/current-dates.php").then(function(response){
		$scope.currentDates = response.data;
		console.log("retrieved");
	})
	
	$scope.addDate = function(){
		console.log("submitted");
		$scope.httpReq = true;
		var formData = JSON.stringify($scope.date);
		$http({
			method: 'POST',
			url: 'ctrl/add-date.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			$scope.success = response.data;
			$scope.complete = true;
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
			});
			$timeout(function(){
				$scope.httpReq = false;
				$scope.complete = false;
			},3000);
		})
	}	
	
	$scope.editDate = function(item){
		$scope.editing = true;
		$scope.editingDate = item;
	}
	
	$scope.saveDate = function(id){
		var formData = JSON.stringify($scope.editingDate);
		$scope.httpReq = true;
		$http({
			method: 'POST',
			url: 'ctrl/edit-date.php?id=' + id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			$scope.success = response.data;
			$scope.complete = true;
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
				$scope.editing = false;
				$scope.complete = true;
			});
			$timeout(function(){
				$scope.httpReq = false;
				$scope.complete = false;
			},3000);
		})
	}
	
	$scope.deleteDate = function(id){
		$scope.httpReq = true;
		$http.post('ctrl/delete-date.php?id=' + id).then(function(response){
			$scope.success = response.data;
			$scope.complete = true;
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
			});
			$timeout(function(){
				$scope.httpReq = false;
				$scope.complete = false;
			},3000);
		});
	}
	
	$scope.closePopup = function(){
		$scope.editing = false;
	}
	
});