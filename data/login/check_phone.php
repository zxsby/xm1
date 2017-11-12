<?php
    require("../init.php");
      @$phone = $_REQUEST["phone"];
       $sql = "SELECT * FROM xm_user WHERE phone='$phone'";
       $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($result);
        if($row==null){
          echo '{"code":1,"msg":"该手机号可以使用"}';
        }else{
         echo '{"code":-1,"msg":"该手机号已被注册"}';
        }