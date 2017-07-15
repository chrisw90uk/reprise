<?php require 'config.php'; ?>
<?php

	$title = "title";
	$subtitle = "subtitle";

	$sql = "SELECT * FROM reprisecwickham.details WHERE detail = :title OR detail = :subtitle";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":title", $title, PDO::PARAM_STR);
	$stmt->bindParam(":subtitle", $subtitle, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$exists = $stmt->rowCount();
	if($exists==0){
		echo false;
	}else{
		echo json_encode($result);
	}

?>
