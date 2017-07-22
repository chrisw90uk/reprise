<?php require 'config.php'; ?>
<?php
	
	$data = json_decode(file_get_contents("php://input"));

	$sql = "SELECT * FROM reprisecwickham.layout";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$sections = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
	$update = "UPDATE reprisecwickham.layout SET `index` = :index WHERE section = :section"; //index is a reserved word
	$edit = $conn->prepare($update);
	$success = false;
	foreach($sections as $key=>$row){
		$section = $data[$key]->section;
		$index = $data[$key]->index;
		$edit->bindValue(":index", $index, PDO::PARAM_INT);
		$edit->bindParam(":section", $section, PDO::PARAM_STR);
		if($edit->execute()){
			$success = true;
		}else{
			echo "Error saving, please try again.";
			$success = false;
			return;
		}
	}
	if($success){
		echo "Layout saved!";
	}

?>