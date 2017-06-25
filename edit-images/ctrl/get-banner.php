<?php require 'config.php'; ?>
<?php

	$name = htmlspecialchars($_GET['name']);
	
	$sql = "SELECT * FROM reprisecwickham.selectedImages WHERE name = :name";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetch();
	$exists = $stmt->rowCount();

	if($exists==0){
		echo "false";
	}else{
		echo json_encode($result);
	}

?>