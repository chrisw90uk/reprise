<?php require 'config.php'; ?>
<?php

	date_default_timezone_set('Europe/London');

	$data = json_decode(file_get_contents("php://input"));
	$id = $data->id;
	$name = $data->name;
	$content = $data->content;
	$date = date('Y/m/d H:i:s');
	$changes = 0;
	$live = 1;

	$sql = "SELECT * FROM reprisecwickham.news WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->execute();
	$exists = $stmt->rowCount();

	if($exists!=0){

		$sql = "UPDATE reprisecwickham.news SET name = :name, date = :date, content = :content, changes = :changes, live = :live WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);

	}else{

		$id = bin2hex(openssl_random_pseudo_bytes(5));

		$sql = "INSERT INTO reprisecwickham.news (id, name, date, content, changes, live) VALUES (:id, :name, :date, :content, :changes, :live)";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);

	}
	
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":date", $date, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	$stmt->bindParam(":changes", $changes, PDO::PARAM_STR);
	$stmt->bindParam(":live", $live, PDO::PARAM_STR);

	if($stmt->execute()){

		$sql = "SELECT * FROM reprisecwickham.newsLive WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":id", $id, PDO::PARAM_STR);
		$stmt->execute();
		$exists = $stmt->rowCount();

		if($exists!=0){
			$sql = "UPDATE reprisecwickham.newsLive SET name = :name, date = :date, content = :content WHERE id = :id";
			$stmt = $conn->prepare($sql);
		}else{
			$sql = "INSERT INTO reprisecwickham.newsLive (id, name, date, content) VALUES (:id, :name, :date, :content)";
			$stmt = $conn->prepare($sql);
		}

		$stmt->bindParam(":id", $id, PDO::PARAM_STR);
		$stmt->bindParam(":name", $name, PDO::PARAM_STR);
		$stmt->bindParam(":date", $date, PDO::PARAM_STR);
		$stmt->bindParam(":content", $content, PDO::PARAM_STR);

		if($stmt->execute()){
			echo true;
		}else{
			echo "Sorry, there was a problem publishing your article.";
		}

	}else{
		echo "Sorry, there was a problem saving your article.";
	}
	

?>