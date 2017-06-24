app.controller("socialMedia", function($scope, $http){
	
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
			icon: 'icons/facebook.png'
		},
		{
			name: "Twitter",
			icon: 'icons/twitter.png'
		},
		{
			name: "LinkedIn",
			icon: 'icons/linkedin.png'
		},
		{
			name: "Instagram",
			icon: 'icons/instagram.png'
		},
		{
			name: "Pinterest",
			icon: 'icons/pinterest.png'
		},
		{
			name: "YouTube",
			icon: 'icons/youtube.png'
		},
		{
			name: "Google",
			icon: 'icons/google.png'
		},
		{
			name: "Tumblr",
			icon: 'icons/tumblr.png'
		},
		{
			name: "Snapchat",
			icon: 'icons/snapchat.png'
		},
		{
			name: "Flickr",
			icon: 'icons/flickr.png'
		},
		{
			name: "Twitch",
			icon: 'icons/twitch.png'
		},
		{
			name: "Soundcloud",
			icon: 'icons/soundcloud.png'
		},
		{
			name: "Vine",
			icon: 'icons/vine.png'
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
		var data = JSON.stringify($scope.selected);
		$http({
			method: 'POST',
			url: 'ctrl/add-social.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			alert(response.data);
			$scope.retrieveSocial();
			$scope.showPopup = false;
			$scope.newItem = false;
		})
	}
	$scope.saveEdit = function(){
		console.log("submitted");
		var data = JSON.stringify($scope.selected);
		$http({
			method: 'POST',
			url: 'ctrl/edit-social.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data
		}).then(function(response){
			alert(response.data);
			$scope.retrieveSocial();
			$scope.showPopup = false;
			$scope.editItem = false;
		})
	}
	$scope.deletePlatform = function(){
		console.log("submitted");
		var choice = confirm("Are you sure you want to delete this network?");
		if(choice==true){
			var data = JSON.stringify($scope.selected);
			$http({
				method: 'POST',
				url: 'ctrl/delete-social.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: data
			}).then(function(response){
				alert(response.data);
				$scope.retrieveSocial();
				$scope.showPopup = false;
				$scope.editItem = false;
			})
		}
	}
	
});