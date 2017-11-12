 <?php
    require("../init.php");
    $uname=$_REQUEST['uname'];
    $sql=" select lid,sm,spec from xm_laptop inner join xm_user_collect_laptop on xm_laptop_id=lid where uname='$uname'";
    //echo $sql;
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($row);
 ?>

