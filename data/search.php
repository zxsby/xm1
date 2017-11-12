<?php
 require("init.php");
 $kw=$_REQUEST["kw"];
 $kws=explode(' ',$kw);
 $cond="";
 for($i=0;$i<count($kws);$i++){
   $kws[$i]="series LIKE '%".$kws[$i]."%'";
 }
 $sql="SELECT series,spec FROM xm_laptop where ".join(" AND ",$kws)."LIMIT 10";
 //echo $sql;
  $result = mysqli_query($conn,$sql);
  $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
  echo json_encode($row);
