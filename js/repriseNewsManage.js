app.controller("manageNews",function($scope, $http, $timeout, $window, $location, status, query){

	$scope.featuredEdit = false;
	
	$scope.published = query.getQuery("publish");
	if($scope.published=="success"){
		$scope.published = true;
	}

	var getNews = $scope.getNews = function(){
		$http.get("ctrl/get-news.php").then(function(response){
			$scope.news = response.data;
		});
		$http.get("ctrl/get-live-news.php").then(function(response){
			$scope.liveNews = response.data;
		});
	}
	
	$scope.getNews = function(){
		$http.get("ctrl/get-news.php").then(function(response){
			$scope.news = response.data;
		});
	}
	
	$scope.deleteArticle = function(id){
		var choice = confirm("Are you sure you want to delete this article?");
		if(choice==true){
			$scope.status = status.show();
			$http.post('ctrl/delete-news.php?id=' + id).then(function(response){
				$scope.success = response.data;
				$scope.status = status.complete();
				getNews();
				$timeout(function(){
					$scope.status = status.hide();
				},3000);
			})
		}
	}

	$scope.saveFeatured = function(){
		$scope.status = status.show();
		var id;
		angular.forEach($scope.liveNews, function(value, key){
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

	$scope.getStatus = function(changes, live){
		if(changes==1 && live==0){
			return "Draft";
		}else if(changes==1 && live==1){
			return "Unpublished changes";
		}else if(changes==0 && live==1){
			return "Live";
		}
	}

	$scope.dateTimeString = function(date){
		date = date.replace(' ','T');
		date = date + "Z";
		return date;
	}

	$scope.featuredChange = function(article){
		angular.forEach($scope.liveNews, function(value, key){
			if(value==article){
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

	getNews();

});