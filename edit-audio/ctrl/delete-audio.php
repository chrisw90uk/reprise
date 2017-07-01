<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));

	$id = $data->id;
	$path = $data->filePath;

	$sql = "DELETE FROM reprisecwickham.audio WHERE ID = :id";
	$delete = $conn->prepare($sql);
	$delete->bindParam(":id", $id, PDO::PARAM_STR);

	if($delete->execute()){
		echo "Audio deleted!";
		unlink("../../".trim($path));
	}else{
		echo "Sorry, there was a problem deleting your audio.";
	}

?>