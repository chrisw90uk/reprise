<?php require 'config.php'; ?>
<?php

	$name = "bio";

	$sql = "SELECT content FROM reprisecwickham.details WHERE detail = :detail";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":detail", $name, PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetch();
	$exists = $stmt->rowCount();
	if($exists==0){
		echo false;
	}else{
		echo json_encode($result);
	}

?>