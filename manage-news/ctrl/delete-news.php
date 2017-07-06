<?php require 'config.php'; ?>
<?php

	$id = htmlspecialchars($_GET['id']);

	$sql = "DELETE FROM reprisecwickham.news WHERE id = :id";
	$delete1 = $conn->prepare($sql);
	$delete1->bindParam(":id", $id, PDO::PARAM_STR);
	
	$sql2 = "DELETE FROM reprisecwickham.newsLive WHERE id = :id";
	$delete2 = $conn->prepare($sql2);
	$delete2->bindParam(":id", $id, PDO::PARAM_STR);

	if($delete1->execute() && $delete2->execute()){
		echo "Article deleted";
	}else{
		echo "Sorry, there was a problem deleting the article.";
	}

?>