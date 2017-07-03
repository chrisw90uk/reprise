<?php require 'config.php'; ?>
<?php

	date_default_timezone_set('Europe/London');

	$data = json_decode(file_get_contents("php://input"));
	$id = $data->id;
	$name = $data->name;
	$content = $data->content;
	$date = date('Y/m/d H:i:s');
	$changes = 1;
	$live = 0;

	$sql = "UPDATE reprisecwickham.news SET name = :name, date = :date, content = :content, changes = :changes WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":date", $date, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	$stmt->bindParam(":changes", $changes, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Article saved!";
	}else{
		echo "Sorry, there was a problem saving your article.";
	}
	

?>