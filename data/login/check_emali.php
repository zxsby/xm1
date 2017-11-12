<?php
    require("../init.php");
      @$email = $_REQUEST["email"];
       $sql = "SELECT * FROM xm_user WHERE email='$email'";
       $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($result);
        if($row==null){
          echo '{"code":1,"msg":"该邮箱可以使用"}';
        }else{
         echo '{"code":-1,"msg":"该邮箱已被注册"}';
        }