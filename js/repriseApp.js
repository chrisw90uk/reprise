var app = angular.module("reprise", []);
app.controller("bannerImg",function($scope, $http){
	$http.get("ctrl/media-img.php").then(function(response){
		$scope.imgs = response.data;
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

	$http.get("ctrl/images.php").then(function(response){
		$scope.images = response.data;
	});

	$http.get("ctrl/audio.php").then(function(response){
		$scope.audio = response.data;
	});

	$http.get("ctrl/video.php").then(function(response){
		$scope.video = response.data;
	});

});

app.controller("addDate",function($scope, $http){
	
	$scope.editingDate = {};
	$scope.editing = false;
	
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
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
			});
		})
	}	
	
	$scope.editDate = function(item){
		$scope.editing = true;
		$scope.editingDate = item;
	}
	
	$scope.saveDate = function(id){
		var formData = JSON.stringify($scope.editingDate);
		$http({
			method: 'POST',
			url: 'ctrl/edit-date.php?id=' + id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: formData
		}).then(function(response){
			alert(response.data);
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
				$scope.editing = false;
			});
		})
	}
	
	$scope.deleteDate = function(id){
		$http.post('ctrl/delete-date.php?id=' + id).then(function(response){
			alert(response.data);
			$http.get("ctrl/current-dates.php").then(function(response){
				$scope.currentDates = response.data;
				console.log("retrieved");
			})
		});
	}
	
	$scope.closePopup = function(){
		$scope.editing = false;
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