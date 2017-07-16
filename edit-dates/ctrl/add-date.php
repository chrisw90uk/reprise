<?php require 'config.php'; ?>
<?php

	date_default_timezone_set('Europe/London');

	$instance = json_decode(file_get_contents("php://input"));
	$id = bin2hex(openssl_random_pseudo_bytes(5));

	$date = $instance->date;
	$date = strtotime($date);
	$date = date("Y-m-d", $date);

	$time = $instance->time;
	$event = $instance->name;
	$venue = $instance->venue;
	$location = $instance->location;
	$tickets = $instance->tickets;
	
	$sql = "INSERT INTO reprisecwickham.dates (id, date, time, event, venue, location, tickets) VALUES (:id, :date, :time, :event, :venue, :location, :tickets)";
	$newDate = $conn->prepare($sql);
	$newDate->bindParam(":id", $id, PDO::PARAM_STR);
	$newDate->bindParam(":date", $date, PDO::PARAM_STR);
	$newDate->bindParam(":time", $time, PDO::PARAM_STR);
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