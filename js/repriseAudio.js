app.controller("editAudio",function($scope, $http, $timeout, status){
	
	$scope.uploadActive = false;


	$scope.retrieveAudio = function(){
		$http.get("ctrl/get-audio.php").then(function(response){
			$scope.existing = response.data;
		});
	}

	$scope.retrieveAudio();
	
	$scope.uploadAudio = function(){
		$scope.uploadActive = true;
	}


	$scope.deleteAudio = function(item){
		var choice = confirm("Are you sure you want to delete this item?");
		if(choice==true){
			$scope.status = status.show();
			var data = JSON.stringify(item);
			$http({
				method: 'POST',
				url: 'ctrl/delete-audio.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
			}).then(function(response){
				$scope.success = response.data;
				$scope.retrieveAudio();
				$scope.status = status.complete();
				$timeout(function(){
					$scope.status = status.hide();
				},3000);
			})
		}
	}


	
	/*
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

	*/
});