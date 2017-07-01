app.controller("display", function($scope, $http){
	
	//banner image
	$http.get("ctrl/display-banner.php").then(function(response){
		$scope.banner = response.data;
	});

	//social media
	$http.get("ctrl/display-social.php").then(function(response){
		$scope.social = response.data;
	});

	//audio
	$http.get("ctrl/display-audio.php").then(function(response){
		$scope.audio = response.data;
	});
	
	//dates
	$http.get("ctrl/display-dates.php").then(function(response){
		$scope.dates = response.data;
	});
		
});   