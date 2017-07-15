<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));

	$title = "title";
	$subtitle = "subtitle";

	$titlecontent = $data->title;
	$subtitlecontent = $data->subtitle;

	$sql = "SELECT * FROM reprisecwickham.details WHERE detail = :title OR detail = :subtitle";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":title", $title, PDO::PARAM_STR);
	$stmt->bindParam(":subtitle", $subtitle, PDO::PARAM_STR);
	$stmt->execute();
	$exists = $stmt->rowCount();
	if($exists==0){

		$sql = "INSERT INTO reprisecwickham.details (detail, content) VALUES (:title, :titlecontent), (:subtitle, :subtitlecontent)";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam(":title", $title, PDO::PARAM_STR);
		$stmt->bindParam(":titlecontent", $titlecontent, PDO::PARAM_STR);
		$stmt->bindParam(":subtitle", $subtitle, PDO::PARAM_STR);
		$stmt->bindParam(":subtitlecontent", $subtitlecontent, PDO::PARAM_STR);
		if($stmt->execute()){
			echo "Details updated!";
		}else{
			echo "Sorry, there was a problem updating your details.";
		}

	}else{
		$sqlTitle = "UPDATE reprisecwickham.details SET content = :titlecontent WHERE detail = :title";
		$stmtTitle = $conn->prepare($sqlTitle);
		$sqlSub = "UPDATE reprisecwickham.details SET content = :subtitlecontent WHERE detail = :subtitle";
		$stmtSub = $conn->prepare($sqlSub);
		$stmtTitle->bindParam(":title", $title, PDO::PARAM_STR);
		$stmtTitle->bindParam(":titlecontent", $titlecontent, PDO::PARAM_STR);
		$stmtSub->bindParam(":subtitle", $subtitle, PDO::PARAM_STR);
		$stmtSub->bindParam(":subtitlecontent", $subtitlecontent, PDO::PARAM_STR);
		if($stmtTitle->execute() && $stmtSub->execute()){
			echo "Details updated!";
		}else{
			echo "Sorry, there was a problem updating your details.";
		}
	}
	