app.controller("display", function($scope, $http, $sce){
	/*
	//order
	$http.get("ctrl/display-layout.php").then(function(response){
		$scope.sections = response.data;
		angular.forEach($scope.sections, function(value, key){
			value.section = value.section.toLowerCase();
		});
		$scope.sections.sort(function(a,b){
			if (a.index < b.index){
			    return -1;
			}
			if (a.index > b.index){
			    return 1;
			}
			return 0;
		});
	});
	*/
	
	//banner image
	$http.get("ctrl/display-banner.php").then(function(response){
		$scope.banner = response.data;
	});

	//details

	$http.get("ctrl/display-details.php").then(function(response){
		$scope.title = response.data[0].content;
		$scope.subtitle = response.data[1].content;
	});

	//bio
	$http.get("ctrl/display-bio.php").then(function(response){
		$scope.bio = response.data;
		$scope.bio.content = $sce.trustAsHtml($scope.bio.content); //check into this
	});

	$http.get("ctrl/display-news.php").then(function(response){
		$scope.news = response.data;

		//create abstract

		angular.forEach($scope.news, function(item) {
			var abstract = item.content;
		    abstract = abstract.replace(/(<([^>]+)>)/ig,""); //strip tags
		    item.content = abstract.slice(0, 100);
		});
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