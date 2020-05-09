<!-- 
	Name: Rachael Bogdany
	Date: 2/29/2020
	Filename: formresult.php
	ISTE340 Project 1
-->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Form Result</title>
	<link rel="stylesheet" href="assets/css/styles.css">
	<script src="assets/js/index.js"></script>
	<script type="text/javascript" src="assets/js/cookies.js"></script>
</head>
<body>
	<div id="formresult">
	<?php
		//Need to capture the data coming from the form
		$fname = $_POST['fname'];
		$lname = $_POST['lname'];
		$hide = $_POST['hide'];
		$cat = $_POST['cat'];
		echo '<h2>Your information was successfully submitted!</h2>';
		echo '<p>First Name: </b>' . $fname . '</p>';
		echo '<p>Last Name: </b>'. $lname . '</p>';
		echo '<p>Your Results: '. $hide . '</p>';
		echo '<p>' . $cat . '</p>';
	?>
	</div>
</body>
</html> 