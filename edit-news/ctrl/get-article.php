<?php require 'config.php' ?>
<?php

	$id = htmlspecialchars($_GET['id']);

	$sql = "SELECT * FROM reprisecwickham.news WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetch();
	$exists = $stmt->rowCount();

	if($exists==0){
		echo false;
	}else{
		echo json_encode($result);
	}

?>