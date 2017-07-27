<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));
	$id = $data->id;
	$name = $data->name;
	$description = $data->description;
	$content = $data->content;
	
	$sql = "UPDATE reprisecwickham.testimonials SET name = :name, description = :description, content = :content WHERE id = :id";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":id", $id, PDO::PARAM_STR);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":description", $description, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Testimonial edited!";
	}else{
		echo "Sorry, there was a problem editing your testimonial.";
	}

?>