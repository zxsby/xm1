 <?php
    require("init.php");
    $fid=$_REQUEST['fid'];
    $sql = "SELECT * FROM xm_laptop WHERE family_id='$fid'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($row);
 ?>