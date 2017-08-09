<?php require 'config.php'; ?>
<?php

	$id = htmlspecialchars($_GET['id']);

	$sql = "DELETE FROM reprisecwickham.testimonials WHERE ID = :id";
	$delete = $conn->prepare($sql);
	$delete->bindParam(":id", $id, PDO::PARAM_STR);

	if($delete->execute()){
		echo "Testimonial deleted";
	}else{
		echo "Sorry, there was a problem deleting your testimonial.";
	}

?>