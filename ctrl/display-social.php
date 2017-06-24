<?php require 'config.php' ?>
<?php

	$sql = "SELECT * FROM reprisecwickham.social";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$social = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$existing = $stmt->rowCount();
	if($existing!=0){
		echo json_encode($social);
	}else{
		echo false;
	}

?>
