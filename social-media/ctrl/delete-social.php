<?php require 'config.php' ?>
<?php

	$deleteSocial = json_decode(file_get_contents("php://input"));

	$name = $deleteSocial->name;
	
	$sql = "DELETE FROM reprisecwickham.social WHERE name = :name";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Network deleted!";
	}else{
		echo "Sorry, there was a problem deleting your data. Please try again";
	}

?>
