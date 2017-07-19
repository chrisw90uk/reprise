app.controller("editDetails",function($scope, $http, $timeout, $window, status){

	$scope.title = {
		title: ""
	};
	$scope.subtitle = {
		subtitle: ""
	};

	$http.get("ctrl/get-details.php").then(function(response){
		console.log(response.data);
		$scope.title.title = response.data[0].content;
		$scope.subtitle.subtitle = response.data[1].content;
	});

	

	$scope.editDetails = function(){
		//$scope.status = status.show();
		var data = { title: $scope.title.title, subtitle: $scope.subtitle.subtitle }
		data = JSON.stringify(data);
		console.log(data);
		$scope.status = status.show();
		$http({
			method: 'POST',
			url: 'ctrl/edit-details.php',
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