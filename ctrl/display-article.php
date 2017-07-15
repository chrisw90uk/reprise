<?php require 'config.php'; ?>
<?php

	$id = htmlspecialchars($_GET["id"]);
	
	$sql = "SELECT * FROM reprisecwickham.newsLive WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$article = $stmt->fetch();
	$existing = $stmt->rowCount();
	if($existing!=0){
		echo json_encode($article);
	}else{
		echo false;
	}

?>