app.controller("display", function($scope, $http, $sce){
	
	//banner image
	$http.get("ctrl/display-banner.php").then(function(response){
		$scope.banner = response.data;
	});

	//bio
	$http.get("ctrl/display-bio.php").then(function(response){
		$scope.bio = response.data;
		$scope.bio.content = $sce.trustAsHtml($scope.bio.content); //check into this
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