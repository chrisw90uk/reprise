<?php require 'config.php'; ?>
<?php

	$data = json_decode(file_get_contents("php://input"));

	$name = $data->name;
	$description = $data->description;
	$content = $data->content;
	
	$sql = "INSERT INTO reprisecwickham.testimonials (name, description, content) VALUES (:name, :description, :content)";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(":name", $name, PDO::PARAM_STR);
	$stmt->bindParam(":description", $description, PDO::PARAM_STR);
	$stmt->bindParam(":content", $content, PDO::PARAM_STR);
	if($stmt->execute()){
		echo "Testimonial added!";
	}else{
		echo "Sorry, there was a problem adding your testimonial.";
	}

?>