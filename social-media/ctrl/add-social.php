<?php require 'config.php' ?>
<?php

	$newSocial = json_decode(file_get_contents("php://input"));

	$name = $newSocial->name;
	$handle = $newSocial->handle;
	$url = $newSocial->url;
	
	$sql = "INSERT INTO reprisecwickham.social (name, url, handle) VALUES (:name, :url, :handle)";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":handle", $handle, PDO::PARAM_STR);
	$stmt->bindParam(":url", $url, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Social media added!";
	}else{
		echo "Sorry, there was a problem adding your date.";
	}

?>
