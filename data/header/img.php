<?php
 require("../init.php");
 $uname = $_REQUEST["uname"];
 $sql = "SELECT * FROM xm_user WHERE uname='$uname'";
 $result = mysqli_query($conn,$sql);
 $row = mysqli_fetch_assoc($result);
 echo json_encode($row);
?>