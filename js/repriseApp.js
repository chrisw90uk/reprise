var app = angular.module("reprise", []);
app.controller("bannerImg",function($scope, $http){
	$http.get("ctrl/media-img.php").then(function(response){
		$scope.imgs = response.data;
	});
});

app.controller("display",function($scope, $http){
	
	//social media
	$http.get("ctrl/display-social.php").then(function(response){
		$scope.social = response.data;
	});
	
	//social media
	$http.get("ctrl/display-dates.php").then(function(response){
		$scope.dates = response.data;
	});
	
	
});

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
	/*
	$http.get("ctrl/audio.php").then(function(response){
		$scope.audio = response.data;
	});

	$http.get("ctrl/video.php").then(function(response){
		$scope.video = response.data;
	});
	*/
});

app.controller("addDate",function($scope, $http){
	$http.get("ctrl/current-dates.php").then(function(response){
		$scope.currentDates = response.data;
		console.log("retrieved");
	})
	$scope.addDate = function(){
		console.log("submitted");
		var formData = JSON.stringify($scope.date);
		$http({
			method: 'POST',
			url: 'ctrl/add-date.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			alert(response.data);
			location.reload();
		})
	}
});

app.controller("editImage",function($scope, $http){
	
	$scope.uploadActive = false;
	$scope.libraryActive = false;
	
	$scope.uploadImage = function(){
		$scope.uploadActive = true;
	}
	$scope.selectImage = function(){
		$scope.libraryActive = true;
		console.log("library active");
	}
});

app.controller("editDetails", function($scope, $http){
	
});

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

/*

app.controller("chatCtrl",function($scope, $http){
	
	$http.get("/database-test/logged-in-user.php").then(function(response){
		$scope.loggedInUser = response.data;
	});

	$http.get("/database-test/chat-ctrl.php").then(function(response){
		$scope.chat = response.data;
	});

});

app.controller("inboxCtrl", function($scope, $http){

	$http.get("/database-test/logged-in-user.php").then(function(response){
		$scope.loggedInUser = response.data;
	});
	
	$http.get("/database-test/chats.php").then(function(response){
		$scope.existingChats = response.data;
	});	
	
	$scope.recipient = function(chat){
		if(chat.user1 == $scope.loggedInUser){
			return chat.user2;
		}else{
			return chat.user1;
		}
	}

	$scope.selectChat = function(chat){
		$http.get("/database-test/chat/chat-select.php?chatid=" + chat).then(function(response){
			$scope.selectedChat = response.data;
			console.log(response.data);
		});	
	}
});

app.controller("registerCtrl", function($scope, $http){


	$scope.userRegister = function(){
		console.log("submitted");
		var formData = JSON.stringify($scope.register);
		$http({
			method: 'POST',
			url: '/database-test/register-ang.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			window.location.href = '/database-test/index.php';
		})
	}
	

});
*/