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

	$sql = "SELECT * FROM reprisecwickham.news WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->execute();
	$exists = $stmt->fetch();

	if($exists!=0){

		$sql = "UPDATE reprisecwickham.news SET name = :name, date = :date, content = :content, changes = :changes, live = :live WHERE id = :id";
		$stmt = $conn->prepare($sql);

	}else{

		$id = bin2hex(openssl_random_pseudo_bytes(5));

		$sql = "INSERT INTO reprisecwickham.news (id, name, date, content, changes, live) VALUES (:id, :name, :date, :content, :changes, :live)";
		$stmt = $conn->prepare($sql);

	}

	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":date", $date, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	$stmt->bindParam(":changes", $changes, PDO::PARAM_STR);
	$stmt->bindParam(":live", $live, PDO::PARAM_STR);
	if($stmt->execute()){

		$result = (object) [
		    'msg' => 'Article Saved!',
		    'id' => $id
		];
		echo json_encode($result);

	}else{
		echo "Sorry, there was a problem saving your article.";
	}
	

?>