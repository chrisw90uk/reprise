<?php require 'config.php'; ?>
<?php

	$instance = json_decode(file_get_contents("php://input"));
	$name = "bannerImage";
	$id = $instance->id;
	$filepath = $instance->filePath;
	
	$sql = "SELECT * FROM reprisecwickham.selectedImages WHERE name = :name";
	$existing = $conn->prepare($sql);
	$existing->bindParam(":name", $name, PDO::PARAM_STR);
	$existing->execute();
	$exists = $existing->rowCount();
	if($exists!=0){
		$sql = "UPDATE reprisecwickham.selectedImages SET id = :id, path = :path WHERE name = :name";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":name", $name, PDO::PARAM_STR);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);
		$stmt->bindParam(":path", $filepath, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Image changed!";
		}else{
			echo "There was an error editing your image. Please try again.";
		}
	}else{
		$sql = "INSERT INTO reprisecwickham.selectedImages (name, id, path) VALUES (:name, :id, :path)";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":name", $name, PDO::PARAM_STR);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);
		$stmt->bindParam(":path", $filepath, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Image added!";
		}else{
			echo "There was an error adding your image. Please try again.";
		}
	}

?>