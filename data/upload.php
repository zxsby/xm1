<?php
 require("init.php");
 $uname = $_REQUEST["uname"];
 $upwd = $_REQUEST["upwd"];
 $sql = "SELECT * FROM xm_user WHERE uname='$uname' AND upwd='$upwd'";
 $result = mysqli_query($conn,$sql);
 $row = mysqli_fetch_assoc($result);
 if($row==null){
   echo '{"code":-1,"msg":"用户名或密码不确"}';
 }else{
  echo '{"code":1,"msg":"登录成功","uname":"'.$uname.'"}';
 }
?>