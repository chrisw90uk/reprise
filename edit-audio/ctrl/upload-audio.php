<?php require 'config.php' ?>
<?php
	$target_dir = "../../uploads/audio/";
	$upload = $_FILES['audio'];
	if ( 0 < $upload['error'] ) {
        echo 'Error: ' . $_FILES['image']['error'];
        return;
    };
	$uploadOk = 1;
	$fileType = pathinfo($upload["name"], PATHINFO_EXTENSION);
	if ($upload["size"] > 100000000) {
	    echo "Sorry, your file is too large.";
	    $uploadOk = 0;
	}
	if($fileType != "mp3"){
		echo "You must upload an .mp3 file";
		//echo $fileType;
		$uploadOk = 0;
	}
	if($uploadOk == 1){
		if (move_uploaded_file($upload['tmp_name'], $target_dir . $upload['name'])) {
        	
			$uploadId = bin2hex(openssl_random_pseudo_bytes(5));
			$uploadName = $_POST['name'];
			$uploadProject = $_POST['project'];
			$uploadDesc = $_POST['desc'];
			$uploadPath = "uploads/audio/".$upload['name'];
			$uploadSelected = 0;
			

			$sql = "INSERT INTO reprisecwickham.audio (id, name, project, description, filePath, selected) VALUES (:id, :name, :project, :description, :filePath, :selected)";
			$newAudio = $conn->prepare($sql);
			$newAudio->bindParam(":id", $uploadId, PDO::PARAM_STR);
			$newAudio->bindParam(":name", $uploadName, PDO::PARAM_STR);
			$newAudio->bindParam(":project", $uploadProject, PDO::PARAM_STR);
			$newAudio->bindParam(":description", $uploadDesc, PDO::PARAM_STR);
			$newAudio->bindParam(":filePath", $uploadPath, PDO::PARAM_STR);
			$newAudio->bindParam(":selected", $uploadSelected, PDO::PARAM_INT);

			if($newAudio->execute()){
				echo "Your audio was uploaded successfully.";
			}else{
				echo "Sorry, there was an error uploading your file.";
			}

    	} else {
        	echo "Sorry, there was an error uploading your file.";
    	}
	}
?>