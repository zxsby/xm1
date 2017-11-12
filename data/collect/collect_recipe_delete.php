<?php
    require("../init.php");
    $uname=$_REQUEST['uname'];
    $lid=$_REQUEST['lid'];
    $sql=" DELETE  FROM xm_user_collect_recipe WHERE uname='$uname'AND recipe_id='$lid'";
   // echo $sql;
    $result = mysqli_query($conn,$sql);
    if($result ==true){
       echo '{"msg":1}';
     }else{
      echo '{"msg":-1}';
     }
 ?>