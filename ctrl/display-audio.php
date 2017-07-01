<?php require 'config.php'; ?>
<?php
	
	$sql = "SELECT * FROM reprisecwickham.audio";
	$dates = $conn->prepare($sql);
	$dates->execute();
	$existingAudio = $dates->fetchAll(PDO::FETCH_ASSOC);
	$existing = $dates->rowCount();
	if($existing!=0){
		echo json_encode($existingAudio);
	}else{
		echo false;
	}

?>