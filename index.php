<?php 

	require 'ctrl/config.php';
	require 'ctrl/display-layout.php';

?>

<html lang="eng">
<head>
	<title>Home | Reprise</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<!-- angular install-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular.min.js"></script>
	<!-- angular app and controller -->
	<script src="js/repriseApp.js"></script>
	<script src="js/repriseDisplay.js"></script>
</head>

<body ng-app="reprise" ng-controller="display">
	<div class="display__banner" style="background-image: url('{{banner.path}}')">
		<div class="display__banner-text">
			<h2>{{ title }}</h2>
			<h3>{{ subtitle }}</h3>
		</div>
	</div>
	<div class="wrapper display">
		<?php foreach ($layout as $key=>$item): ?> 
			<div class="display__section display__<?php echo strtolower($item[section]) ?>">
				<?php 
					include 'display-includes/'.strtolower($item[section]).'.html';
				?>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="display__social">
		<a ng-repeat="item in social" ng-href="http://{{item.url}}{{item.handle}}">
			<img ng-src="social-media/icons/{{ item.name | lowercase }}.png">
		</a>
	</div>

</body>
</html>