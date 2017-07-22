<?php require 'config.php'; ?>
<?php
	
	$sql = "SELECT * FROM reprisecwickham.layout";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$layout = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$existing = $stmt->rowCount();
	if($existing!=0){
		echo json_encode($layout);
	}else{
		echo false;
	}

?>