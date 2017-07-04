app.controller("addNews",function($scope, $http, $timeout, $window, status){

	$scope.article = {};

	$scope.saveNews = function(){
		$scope.status = status.show();
		var data = JSON.stringify($scope.article);
		$http({
			method: 'POST',
			url: 'ctrl/save-news.php',
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

	$scope.publishNews = function(){
		$scope.status = status.show();
		var data = JSON.stringify($scope.article);
		$http({
			method: 'POST',
			url: 'ctrl/publish-news.php',
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