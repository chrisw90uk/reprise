app.controller("editAudio",function($scope, $http, $timeout, $window, status){
	
	$scope.popupActive = false;
	$scope.newItem = false;
	$scope.editItem = false;
	$scope.editing = {};
	$scope.featuredEdit = false;


	$scope.retrieveAudio = function(){
		$http.get("ctrl/get-audio.php").then(function(response){
			$scope.existing = response.data;
		});
	}

	$scope.retrieveAudio();
	
	$scope.uploadAudio = function(){
		$scope.newItem = true;
		$scope.popupActive = true;
	}

	$scope.editAudio = function(item){
		$scope.editing = item;
		$scope.editItem = true;
		$scope.popupActive = true;
	}

	$scope.saveEdits = function(item){
		$scope.status = status.show();
		var data = JSON.stringify($scope.editing);
		$http({
			method: 'POST',
			url: 'ctrl/edit-audio.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			$scope.success = response.data;
			$scope.retrieveAudio();
			$scope.status = status.complete();
			closePopup();
			$timeout(function(){
				$scope.status = status.hide();
			},3000);
		})
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

	var closePopup = $scope.closePopup = function(){
		$scope.popupActive = false;
		$scope.newItem = false;
		$scope.editItem = false;
	}

	$scope.featuredChange = function(track){
		angular.forEach($scope.existing, function(value, key){
			if(value==track){
				if(value.featured==1){
					value.featured = 0;
				}else{
					value.featured = 1;
				}
			}else{
				value.featured = 0;
			}
		});
		$scope.featuredEdit = true;
	}

	$scope.saveFeatured = function(){
		$scope.status = status.show();
		var id;
		angular.forEach($scope.existing, function(value, key){
			if(value.featured==1){
				id = value.id;
				return;
			}
		});
		console.log(id);
		
		$http.post('ctrl/save-featured.php?id=' + id).then(function(response){
			$scope.success = response.data;
			$scope.status = status.complete();
			$scope.featuredEdit = false;
			$timeout(function(){
				$scope.status = status.hide();
			},3000);
		})
	}
	
	
});