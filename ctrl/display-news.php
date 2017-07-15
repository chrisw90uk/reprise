<?php require 'config.php'; ?>
<?php
	
	$sql = "SELECT * FROM reprisecwickham.newsLive";
	$dates = $conn->prepare($sql);
	$dates->execute();
	$existingDates = $dates->fetchAll(PDO::FETCH_ASSOC);
	$existing = $dates->rowCount();
	if($existing!=0){
		echo json_encode($existingDates);
	}else{
		echo false;
	}

?>