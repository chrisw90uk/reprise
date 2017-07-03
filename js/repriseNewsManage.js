app.controller("manageNews",function($scope, $http, $timeout, $window, status){

	var getNews = $scope.getNews = function(){
		$http.get("ctrl/get-news.php").then(function(response){
			$scope.news = response.data;
		});
	}

	getNews();

});