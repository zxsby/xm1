<?php
  // 1.获取上传文件的信息并且判断是否上传文件
   //$_FILES["mypic"];
    if(!empty($_FILES["mypic"])){
  //2.获取文件的大小获取文件的名称
     $picname=$_FILES["mypic"]["name"];
     $picsize=$_FILES["mypic"]["size"];
  // 3.判断文件大小不能超过2*1024*1024=2MB
  if($picsize>2*1024*1024){
    echo "图片大小不能超过两兆";
    exit;  //停止php程序执行
  }
  //4.判断文件类型.gif.png.jpg
  //strstr("1.jpg","."):=>.jpg
  $type=strstr("$picname",".");
  if($type!=".gif"&&$type!=".png"&&$type!=".jpg"){
     echo "图片格式不正确";
     exit;
   }
   //5.创建新的文件名 time().rand(1,9999).
   $pics=time().rand(1,9999).$type;
   //6.将上传临时文件移动到uploads
   move_uploaded_file($_FILES["mypic"]["tmp_name"],"uploads/".$pics);
   }
   echo "login/uploads/".$pics;
?>