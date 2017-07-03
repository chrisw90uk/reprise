app.controller("editNews",function($scope, $http, $timeout, $window, status, query){

	$scope.article = {};

	var getNews = $scope.getNews = function(){
		var id = query.getQuery("id");
		console.log(id);
		$http.get("ctrl/get-article.php?id=" + id).then(function(response){
			$scope.article = response.data;
		});
	}

	$scope.getStatus = function(changes, live){
		if(changes==1 && live==0){
			return "Draft";
		}else if(changes==1 && live==1){
			return "Unpublished changes";
		}else if(changes==0 && live==1){
			return "Live";
		}
	}

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


	getNews();

});