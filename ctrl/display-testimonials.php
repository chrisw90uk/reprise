<?php require 'config.php'; ?>
<?php
	
	$sql = "SELECT * FROM reprisecwickham.testimonials";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$existing = $stmt->rowCount();
	if($existing!=0){
		echo json_encode($result);
	}else{
		echo false;
	}

?>