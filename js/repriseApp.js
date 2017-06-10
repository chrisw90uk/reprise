var app = angular.module("database", []);
app.controller("fileUpload",function($scope, $http){


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