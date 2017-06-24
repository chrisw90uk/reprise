app.controller("display", function($scope, $http){
	
	//social media
	$http.get("ctrl/display-social.php").then(function(response){
		$scope.social = response.data;
	});
	
	//dates
	$http.get("ctrl/display-dates.php").then(function(response){
		$scope.dates = response.data;
	});
		
});   