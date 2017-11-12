<?php
    require("../init.php");
      @$email = $_REQUEST["email"];
      //echo $email;
      @$uname = $_REQUEST["uname"];
      @$upwd = $_REQUEST["upwd"];
      @$phone = $_REQUEST["phone"];
      @$avatar = $_REQUEST["avatar"];
      $sql = "INSERT INTO xm_user VALUES('null','$uname','$upwd','$email','$phone','$avatar','','')";
       $result = mysqli_query($conn,$sql);
        if($result==true){
                 echo '{"code":1,"msg":"注册成功"}';
               }else{
                echo '{"code":-1,"msg":"注册失败"}';
               }