app.controller("editImages",function($scope, $http, $timeout, status){
	
	$scope.uploadActive = false;
	$scope.libraryActive = false;
	$scope.currentImage;
	
	$scope.uploadImage = function(){
		$scope.uploadActive = true;
	}
	$scope.selectImage = function(image){
		$scope.libraryActive = true;
		$http.get('ctrl/get-banner.php?name=' + image).then(function(response){
			$scope.currentImage = response.data;
			console.log($scope.currentImage.id);
		});
	}

	$scope.chooseNew = function(item){
		$scope.currentImage = item;
		console.log($scope.currentImage.name);
	}

	$scope.saveNew = function(){
		$scope.status = status.show();
		var formData = JSON.stringify($scope.currentImage);
		$http({
			method: 'POST',
			url: 'ctrl/banner-image.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			$scope.success = response.data;
			$scope.status = status.complete();
			$scope.libraryActive = false;
			$timeout(function(){
				$scope.status = status.hide();
			},3000);
		});
	}
	$scope.closePopup = function(){
		$scope.libraryActive = false;
	}
});