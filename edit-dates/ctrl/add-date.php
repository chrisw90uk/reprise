<?php require 'config.php'; ?>
<?php

	$instance = json_decode(file_get_contents("php://input"));
	$id = bin2hex(openssl_random_pseudo_bytes(5));
	$date = $instance->datetime;
	$event = $instance->name;
	$venue = $instance->venue;
	$location = $instance->location;
	$tickets = $instance->tickets;
	
	$sql = "INSERT INTO reprisecwickham.dates (id, date, event, venue, location, tickets) VALUES (:id, :date, :event, :venue, :location, :tickets)";
	$newDate = $conn->prepare($sql);
	$newDate->bindParam(":id", $id, PDO::PARAM_STR);
	$newDate->bindParam(":date", $date, PDO::PARAM_STR);
	$newDate->bindParam(":event", $event, PDO::PARAM_STR);
	$newDate->bindParam(":venue", $venue, PDO::PARAM_STR);
	$newDate->bindParam(":location", $location, PDO::PARAM_STR);
	$newDate->bindParam(":tickets", $tickets, PDO::PARAM_STR);
	if($newDate->execute()){
		echo "Date added!";
	}else{
		echo "Sorry, there was a problem adding your date.";
	}

?>