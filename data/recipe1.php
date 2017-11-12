 <?php
   require("init.php");
      $lid=$_REQUEST['lid'];
      $sql = "SELECT img,tips,lname,title,material,practice FROM recipe WHERE lid='$lid'";
      $result = mysqli_query($conn,$sql);
      $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
      echo json_encode($row);