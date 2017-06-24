app.controller("editImages",function($scope, $http){
	
	$scope.uploadActive = false;
	$scope.libraryActive = false;
	$scope.currentImage;
	
	$scope.uploadImage = function(){
		$scope.uploadActive = true;
	}
	$scope.selectImage = function(image){
		$scope.libraryActive = true;
		console.log("library active");
		$scope.currentImage = image;
	}
});