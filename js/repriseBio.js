app.controller("editBio",function($scope, $http, $timeout, $window, status){
	
	$scope.getBio = function(){
		$http.get("ctrl/get-bio.php").then(function(response){
			$scope.bio = response.data;
			if(!$scope.bio){
				$scope.bio = {};
				$scope.bio.content = "Write your biography today!";
			}
		});
	}

	$scope.getBio();

	$scope.saveBio = function(){
		$scope.status = status.show();
		var data = JSON.stringify($scope.bio.content);
		$http({
			method: 'POST',
			url: 'ctrl/save-bio.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			$scope.success = response.data;
			$scope.status = status.complete();
			$timeout(function(){
				$scope.status = status.hide();
			},3000);
		})
	}
});