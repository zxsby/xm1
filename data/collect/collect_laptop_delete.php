<?php
    require("../init.php");
    $uname=$_REQUEST['uname'];
    $lid=$_REQUEST['lid'];
    $sql=" DELETE  FROM xm_user_collect_laptop WHERE uname='$uname'AND xm_laptop_id='$lid'";
   // echo $sql;
    $result = mysqli_query($conn,$sql);
    if($result ==true){
       echo '{"msg":"收藏"}';
     }else{
      echo '{"msg":"取消收藏"}';
     }
 ?>