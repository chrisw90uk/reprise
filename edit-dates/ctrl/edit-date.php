<?php require 'config.php'; ?>
<?php

	$instance = json_decode(file_get_contents("php://input"));
	$id = htmlspecialchars($_GET['id']);
	$date = $instance->datetime;
	$event = $instance->event;
	$venue = $instance->venue;
	$location = $instance->location;
	$tickets = $instance->tickets;
	
	$sql = "UPDATE reprisecwickham.dates SET date = :date, event = :event, venue = :venue, location = :location, tickets = :tickets WHERE id = :id";
	$editDate = $conn->prepare($sql);
	$editDate->bindParam(":id", $id, PDO::PARAM_STR);
	$editDate->bindParam(":date", $date, PDO::PARAM_STR);
	$editDate->bindParam(":event", $event, PDO::PARAM_STR);
	$editDate->bindParam(":venue", $venue, PDO::PARAM_STR);
	$editDate->bindParam(":location", $location, PDO::PARAM_STR);
	$editDate->bindParam(":tickets", $tickets, PDO::PARAM_STR);
	if($editDate->execute()){
		echo "Date edited!";
	}else{
		echo "Sorry, there was a problem adding your date.";
	}

?>