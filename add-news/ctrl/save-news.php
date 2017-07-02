<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));
	$id = bin2hex(openssl_random_pseudo_bytes(5));
	$name = $data->name;
	$content = $data->content;
	$live = 0;

	$sql = "INSERT INTO reprisecwickham.news (id, name, content, live) VALUES (:id, :name, :content, :live)";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	$stmt->bindParam(":live", $live, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Article saved!";
	}else{
		echo "Sorry, there was a problem saving your article.";
	}
	

?>