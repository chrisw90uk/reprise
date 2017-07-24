<?php require 'config.php'; ?>
<?php

	$id = htmlspecialchars($_GET['id']);
	$remove = 0;
	$featured = 1;

	$sql = "UPDATE reprisecwickham.audio SET featured = :remove";
	$stmt = $conn->prepare($sql);
	$stmt->bindValue(":remove", $remove, PDO::PARAM_INT);
	if($stmt->execute()){
		$sql = "UPDATE reprisecwickham.audio SET featured = :featured WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":featured", $featured, PDO::PARAM_INT);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Featured track saved!";
		}else{
			echo "Sorry, there was a problem saving your featured track.";
		}
	}else{
		echo "Sorry, there was a problem updating the database";
	}
	

?>