 <?php
  require("init.php");
    //4:获取参数pno 当前页码
      @$pno = $_REQUEST["pno"];
      @$kw = $_REQUEST["kw"];
      //5:如果当前页码参数不存在则显示第一页
      if(!$pno){
        $pno = 1;
      }else{
        $pno = intval($pno);//将字符串数据转换整数js parseInt()
      }
      //6:创建数组  拼装返回结果
      //总记录数  总页数  当前页  当前页数据
      $pageSize = 24;
      $output = ["recodeCount"=>0,     //满足条件的总记录数
                "pageCount"=>0,        //总页数
                "pno"=>$pno,           //当前数据所有页码
                "data"=>null,          //当前页中的数据
                "pageSize"=>$pageSize, //每个页大小
                ];
     $sql = "SELECT COUNT(*) FROM xm_laptop";
     if($kw){
         if($kw=='所有'||$kw=='全部'){

         }else{
            $sql.=" WHERE series LIKE '%$kw%'";
         }
     }
     //echo $sql;
     $result = mysqli_query($conn,$sql);
      $row = mysqli_fetch_row($result);
      $output["recodeCount"]=intval($row[0]);
      $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
      $start = ($output["pno"]-1)*$output["pageSize"];
      $count = $output["pageSize"];
      $sql  = " SELECT * FROM xm_laptop ";
      if($kw){
         if($kw=='所有'||$kw=='全部'){

                  }else{
                     $sql.=" WHERE series LIKE '%$kw%'";
                  }
        }
      $sql  .= "  LIMIT $start,$count";
      $result = mysqli_query($conn,$sql);
      $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
      $output["data"]=$rows;
      echo json_encode($output);