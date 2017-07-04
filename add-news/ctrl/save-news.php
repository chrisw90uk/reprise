<?php require 'config.php'; ?>
<?php

	date_default_timezone_set('Europe/London');

	$data = json_decode(file_get_contents("php://input"));
	$id = bin2hex(openssl_random_pseudo_bytes(5));
	$name = $data->name;
	$content = $data->content;
	$date = date('Y/m/d H:i:s');
	$changes = 1;
	$live = $data->live;
	if($live==1){
		$live = 1;
	}else{
		$live = 0;
	}
	

	$sql = "INSERT INTO reprisecwickham.news (id, name, date, content, changes, live) VALUES (:id, :name, :date, :content, :changes, :live)";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":date", $date, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	$stmt->bindParam(":changes", $changes, PDO::PARAM_STR);
	$stmt->bindParam(":live", $live, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Article saved!";
	}else{
		echo "Sorry, there was a problem saving your article.";
	}
	

?>