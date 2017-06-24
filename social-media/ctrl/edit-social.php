<?php require 'config.php' ?>
<?php

	$editSocial = json_decode(file_get_contents("php://input"));

	$name = $editSocial->name;
	$handle = $editSocial->handle;
	
	$sql = "UPDATE reprisecwickham.social SET handle = :handle WHERE name = :name";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":handle", $handle, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Changes saved!";
	}else{
		echo "Sorry, there was a problem saving your data. Please try again";
	}

?>
