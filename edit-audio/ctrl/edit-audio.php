<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));
	$id = $data->id;
	$name = $data->name;
	$project = $data->project;
	$description = $data->description;
	
	$sql = "UPDATE reprisecwickham.audio SET name = :name, project = :project, description = :description WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":project", $project, PDO::PARAM_STR);
	$stmt->bindParam(":description", $description, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Audio edited!";
	}else{
		echo "Sorry, there was a problem editing your audio.";
	}

?>