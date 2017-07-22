<?php
	
	$sql = "SELECT * FROM reprisecwickham.layout";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$layout = $stmt->fetchAll(PDO::FETCH_ASSOC);

	usort($layout, function($a, $b)
	{
	    return $a[index] - $b[index];
	});

?>