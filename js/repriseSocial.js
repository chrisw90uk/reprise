app.controller("socialMedia", function($scope, $http, $timeout, status){
	
	$scope.showPopup = false;
	$scope.selected = {};
	
	
	$scope.retrieveSocial = function (){
		$http.get("ctrl/social.php").then(function(response){
			$scope.existing = response.data;
			console.log("retrieved");
			if(response.data==false){
				$scope.existingSocial = false;
			}else{
				$scope.existingSocial = true;
			}
		})
	}
	
	$scope.retrieveSocial();
	
	$scope.platforms = [
		{
			name: "Facebook",
			icon: 'icons/facebook.png',
			url: "facebook.com/"
		},
		{
			name: "Twitter",
			icon: 'icons/twitter.png',
			url: "twitter.com/"
		},
		{
			name: "LinkedIn",
			icon: 'icons/linkedin.png',
			url: 'linkedin.com/in/'
		},
		{
			name: "Instagram",
			icon: 'icons/instagram.png',
			url: 'instagram.com/'
		},
		{
			name: "Pinterest",
			icon: 'icons/pinterest.png',
			url: 'pinterest.com/'
		},
		{
			name: "YouTube",
			icon: 'icons/youtube.png',
			url: 'youtube.com/user/'
		},
		{
			name: "Google",
			icon: 'icons/google.png',
			url: 'plus.google.com/'
		},
		{
			name: "Tumblr",
			icon: 'icons/tumblr.png',
			url: '.tumblr.com'
		},
		{
			name: "Snapchat",
			icon: 'icons/snapchat.png'
		},
		{
			name: "Flickr",
			icon: 'icons/flickr.png',
			url: 'flickr.com/people/'
		},
		{
			name: "Twitch",
			icon: 'icons/twitch.png',
			url: 'twitch.tv/'
		},
		{
			name: "Soundcloud",
			icon: 'icons/soundcloud.png',
			url: 'soundcloud.com/'
		},
		{
			name: "Vine",
			icon: 'icons/vine.png',
			url: 'vine.co/'
		}
	];
	
	$scope.filterPlatforms = function(item){
		for(platform in $scope.existing){
			var currentItem = $scope.existing[platform].name;
			if(item.name === currentItem){
				return true;
			}
		}		
	}
	
	$scope.selectPlatform = function(item){
		$scope.showPopup = true;
		$scope.newItem = true;
		$scope.selected = item;
	}
	$scope.editPlatform = function(item){
		$scope.showPopup = true;
		$scope.editItem = true;
		$scope.selected = item;
	}
	$scope.closePopup = function(){
		$scope.showPopup = false;
		$scope.editItem = false;
		$scope.newItem = false;
	}
	
	$scope.newPlatform = function(){
		console.log("submitted");
		$scope.status = status.show();
		var data = JSON.stringify($scope.selected);
		$http({
			method: 'POST',
			url: 'ctrl/add-social.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			$scope.success = response.data;
			$scope.retrieveSocial();
			$scope.showPopup = false;
			$scope.newItem = false;
			$scope.status = status.complete();
			$timeout(function(){
				$scope.status = status.hide();
			},3000);
		})
	}
	$scope.saveEdit = function(){
		console.log("submitted");
		$scope.status = status.show();
		var data = JSON.stringify($scope.selected);
		$http({
			method: 'POST',
			url: 'ctrl/edit-social.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			$scope.success = response.data;
			$scope.retrieveSocial();
			$scope.showPopup = false;
			$scope.editItem = false;
			$scope.status = status.complete();
			$timeout(function(){
				$scope.status = status.hide();
			},3000);
		})
	}
	$scope.deletePlatform = function(){
		console.log("submitted");
		var choice = confirm("Are you sure you want to delete this network?");
		if(choice==true){
			$scope.status = status.show();
			var data = JSON.stringify($scope.selected);
			$http({
				method: 'POST',
				url: 'ctrl/delete-social.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
			}).then(function(response){
				$scope.success = response.data;
				$scope.retrieveSocial();
				$scope.showPopup = false;
				$scope.editItem = false;
				$scope.status = status.complete();
				$timeout(function(){
					$scope.status = status.hide();
				},3000);
			})
		}
	}
	
});