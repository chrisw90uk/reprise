<?php
	$hostname = "reprisecwickham.db.5816374.hostedresource.com";
	$username = "reprisecwickham";
	$dbname = "reprisecwickham";
	$password = "Qzz7bv!2";
	try {
	    $conn = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
	catch(PDOException $e){
	    echo "Connection failed: ".$e->getMessage();
    }
?>