<?php require 'config.php' ?>
<?php

	$sql = "SELECT id, name, filePath FROM reprisecwickham.images";
	$images = $conn->prepare($sql);
	$images->execute();
	$result = $images->fetchAll(PDO::FETCH_ASSOC);
	$exists = $images->rowCount();

	if($exists==0){
		echo "You have no uploaded images";
	}else{
		echo json_encode($result);
	}

?>