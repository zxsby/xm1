<?php
    require("../init.php");
    $uname=$_REQUEST['uname'];
    $lid=$_REQUEST['lid'];
    $sql=" select * from xm_user_collect_recipe WHERE uname='$uname'AND recipe_id='$lid'";
    //echo $sql;
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    if($row==null){
       echo '{"code":-1}';
     }else{
      echo '{"code":1}';
     }
 ?>