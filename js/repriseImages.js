app.controller("editImages",function($scope, $http){
	
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
		var formData = JSON.stringify($scope.currentImage);
		$http({
			method: 'POST',
			url: 'ctrl/banner-image.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			alert(response.data);
		});
	}
	$scope.closePopup = function(){
		$scope.libraryActive = false;
	}

});