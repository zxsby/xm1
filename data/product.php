<?php
   require("init.php");
   $lid=$_REQUEST['lid'];
    $sql = "SELECT * FROM xm_laptop WHERE lid='$lid'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $fid=$row["family_id"];
    $sql = "SELECT lid,sm,series,spec FROM xm_laptop WHERE family_id='$fid'";
    $result = mysqli_query($conn,$sql);
    $rows= mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql = "SELECT laptop_url,smimg,bigimg,capacity,color,price FROM xm_product WHERE laptop_id='$lid'";
    $result = mysqli_query($conn,$sql);
    $rowss= mysqli_fetch_assoc($result);
      $output = ["row"=>$row,
                 "rows"=>$rows,
                 "rowss"=>$rowss];

    echo json_encode($output);
 ?>