app.controller("manageNews",function($scope, $http, $timeout, $window, status){

	var getNews = $scope.getNews = function(){
		$http.get("ctrl/get-news.php").then(function(response){
			$scope.news = response.data;
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

	$scope.dateTimeString = function(date){
		date = date.replace(' ','T');
		date = date + "Z";
		return date;
	}

	getNews();

});