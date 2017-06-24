<?php require 'config.php'; ?>
<?php

	$id = htmlspecialchars($_GET['id']);

	$sql = "DELETE FROM reprisecwickham.dates WHERE ID = :id";
	$delete = $conn->prepare($sql);
	$delete->bindParam(":id", $id, PDO::PARAM_STR);

	if($delete->execute()){
		echo "Date deleted";
	}else{
		echo "Sorry, there was a problem adding your date.";
	}

?>