app.controller("displayNews", function($scope, $http, $sce, query){
	
	//banner image

	var id = query.getQuery("id");

	if(id==undefined){
		window.location.href = '../';
	}else{
		$http.get("ctrl/display-article.php?id=" + id).then(function(response){
			$scope.article = response.data;
			if(!$scope.article){
				window.location.href = '../';
			}
			$scope.article.content = $sce.trustAsHtml($scope.article.content)
		});
	};

		
});   