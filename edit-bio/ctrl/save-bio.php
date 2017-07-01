<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));
	$name = "bio";
	$content = $data;

	$sql = "SELECT * FROM reprisecwickham.details WHERE detail = :detail";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":detail", $name, PDO::PARAM_STR);
	$stmt->execute();
	$exists = $stmt->rowCount();
	if($exists==0){
		$sql = "INSERT INTO reprisecwickham.details (detail, content) VALUES (:detail, :content)";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":detail", $name, PDO::PARAM_STR);
		$stmt->bindParam(":content", $content, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Bio added!";
		}else{
			echo "Sorry, there was a problem editing your bio.";
		}
	}else{
		$sql = "UPDATE reprisecwickham.details SET content = :content WHERE detail = :detail";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":detail", $name, PDO::PARAM_STR);
		$stmt->bindParam(":content", $content, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Bio edited!";
		}else{
			echo "Sorry, there was a problem editing your bio.";
		}
	}

?>