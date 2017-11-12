<?php
    require("init.php");
    $questionClass=$_REQUEST['questionClass'];
    $sql = "SELECT question,answer FROM xm_answer WHERE questionClass='$questionClass'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($row);
 ?>