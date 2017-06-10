<?php require 'config.php' ?>
<?php
	$target_dir = "../uploads/img/";
	$upload = $_FILES['image'];
	if ( 0 < $upload['error'] ) {
        echo 'Error: ' . $_FILES['image']['error'];
        return;
    };
	$uploadOk = 1;
	$fileType = pathinfo($upload["name"], PATHINFO_EXTENSION);
	if ($upload["size"] > 50000000) {
	    echo "Sorry, your file is too large.";
	    $uploadOk = 0;
	}
	if($fileType != "jpg"){
		echo "You must upload an .jpg or .png file";
		//echo $fileType;
		$uploadOk = 0;
	}
	if($uploadOk == 0){
		echo "Sorry, your file was not uploaded";
	}else{
		if (move_uploaded_file($upload['tmp_name'], $target_dir . $upload['name'])) {
        	echo "The file ".$upload["name"]." has been uploaded.";
    	} else {
        	echo "Sorry, there was an error uploading your file.";
    	}
	}
?>