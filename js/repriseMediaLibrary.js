app.controller("mediaLibrary", function($scope, $http){
	
	//Tab function

	$scope.activeTab = 0;

	$scope.media = [
		{
			name: "Images",
			class: "images"
		},
		{
			name: "Audio",
			class: "audio"
		},
		{
			name: "Videos",
			class: "videos"
		}
	];

	$scope.changeTab = function(index){
		$scope.activeTab = index;
	};

	$http.get("ctrl/media-images.php").then(function(response){
		$scope.images = response.data;
	});
	
	$console.log($scope.currentImage);
	
	/*
	$http.get("ctrl/audio.php").then(function(response){
		$scope.audio = response.data;
	});

	$http.get("ctrl/video.php").then(function(response){
		$scope.video = response.data;
	});
	*/
});