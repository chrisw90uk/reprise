<?php require 'config.php' ?>
<?php
	$target_dir = "../uploads/video/";
	$upload = $_FILES['video'];
	if ( 0 < $upload['error'] ) {
        echo 'Error: ' . $_FILES['image']['error'];
        return;
    };
	$uploadOk = 1;
	$fileType = pathinfo($upload["name"], PATHINFO_EXTENSION);
	if ($upload["size"] > 500000000) {
	    echo "Sorry, your file is too large.";
	    $uploadOk = 0;
	}
	if($fileType != "jpg"){
		echo "You must upload an .mp4 file";
		//echo $fileType;
		$uploadOk = 0;
	}
	if($uploadOk == 0){
		echo "Sorry, your file was not uploaded";
	}else{
		if (move_uploaded_file($upload['tmp_name'], $target_dir . $upload['name'])) {
        	
			$uploadId = bin2hex(openssl_random_pseudo_bytes(5));
			$uploadName = $_POST['name'];
			$uploadPath = "/uploads/img/".$upload['name'];

			$sql = "INSERT INTO reprisecwickham.videos (id, name, filePath, height, width) VALUES (:id, :name, :filePath, :height, :width)";
			$newVideo = $conn->prepare($sql);
			$newVideo->bindParam(":id", $uploadId, PDO::PARAM_STR);
			$newVideo->bindParam(":name", $uploadName, PDO::PARAM_STR);
			$newVideo->bindParam(":filePath", $uploadPath , PDO::PARAM_STR);

			if($newVideo->execute()){
				echo "Your image was uploaded successfully.";
			}else{
				echo "Sorry, there was an error uploading your file.";
			}

    	} else {
        	echo "Sorry, there was an error uploading your file.";
    	}
	}
?>