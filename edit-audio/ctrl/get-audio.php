<?php require 'config.php' ?>
<?php

	$sql = "SELECT * FROM reprisecwickham.audio";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$exists = $stmt->rowCount();

	if($exists==0){
		echo false;
	}else{
		echo json_encode($result);
	}

?>