<?php require 'config.php'; ?>
<?php

	$id = htmlspecialchars($_GET['id']);
	$remove = 0;
	$featured = 1;

	$sql = "UPDATE reprisecwickham.newsLive SET featured = :remove";
	$stmt = $conn->prepare($sql);
	$stmt->bindValue(":remove", $remove, PDO::PARAM_INT);
	if($stmt->execute()){
		$sql = "UPDATE reprisecwickham.newsLive SET featured = :featured WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindValue(":featured", $featured, PDO::PARAM_INT);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Featured article saved!";
		}else{
			echo "Sorry, there was a problem saving your featured article.";
		}
	}else{
		echo "Sorry, there was a problem updating the database";
	}
	

?>