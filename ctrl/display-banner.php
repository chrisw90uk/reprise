<?php require 'config.php' ?>
<?php

	$name = "bannerImage";
	$sql = "SELECT * FROM reprisecwickham.selectedImages WHERE name = :name";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->execute();
	$banner = $stmt->fetch();
	$existing = $stmt->rowCount();
	if($existing!=0){
		echo json_encode($banner);
	}else{
		echo false;
	}

?>
