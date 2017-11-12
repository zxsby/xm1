/**
 * Created by Administrator on 2017/10/5 0005.
 */
(()=>{
    $.get("header.html")
        .then(html=>{
            $("#top").html(html);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/header.css"><link rel="stylesheet"  href="css/iconfont.css">';
            return new Promise(resolve=>resolve());
        })
        .then(()=>{
            ////////////
            $("#header .hd1_2").css("opacity",1);
            $("#header .hd1>.hd2>ul").children(":eq(1)").children().first().addClass("hd1_21");
            $("#header .hd1_2").css("left",parseInt($("#header .hd1>.hd2>ul").children().first().children().first().css("width")));
            $("#header .hd1>.hd2").on("mouseover"," ul>li",function(){
                var li=$(this);
                if(!li.children().first().hasClass("hd1_21")){
                    li.children().first().addClass("hd1_21");
                    li.siblings().children().removeClass("hd1_21");
                }
                var left=parseInt(li.children().first().css("width"));
                var i=li.index();
                $("#header .hd1_2").css("left",i*left);
            });
            $("#header .hd1").on("mouseleave","ul",function(){
                var li=$(this);
                $("#header ul>li>a").removeClass("hd1_21");
                $("#header .hd1>.hd2>ul").children(":eq(1)").children().first().addClass("hd1_21")
                // .first().addClass("hd1_21");
                $("#header .hd1_2").css("left",parseInt(li.children().first().css("width")));
                $("#header .hd1_2").css("opacity",1);
            });
            $(".hd1").css({"position":"fixed",
                "top":0,"left":0,"z-index":100,"width":"100%"});
        })
})();
/*动态加载底部*/
(()=>{
    $.get("footer.html")
        .then(html=>{
            $("#fot").html(html);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/footer.css">';
        })

})();
/*动态加载侧边栏*/
(()=>{
    $.get("cebianlan.html")
        .then(html=>{
            $("#celan").html(html);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/cebianlan.css">';
            return new Promise(resolve=>resolve());
        })
})();
/*左右按钮*/
(()=> {
    $.get("data/product.php",location.search.slice(1))
        .then(date=>{
            var uname = sessionStorage.getItem("uname");
            var str="";
            if(uname==null){
              str="收藏";
            }else{
                $.ajax({
                    type:'GET',
                    url:'data/collect/collect_laptop_select.php',
                    data:{
                        lid:location.search.slice(5),
                        uname
                    },
                    success:function(data){
                        console.log(data);
                        $("#collect").html(data.msg);
                    },
                    error:function(){
                        alert("网络错误");
                    }
                })
            }
            console.log(uname);
            var laptop=date.rowss.laptop_url.split(',');
            var n=laptop.length;
            var smimg=date.rowss.smimg.split(',');
          //  var width=$(".proshow").css("width");
            console.log(laptop);
            console.log(smimg);
            var html=`
           <div class="inner">
             <p>${date.row.spec}&nbsp&nbsp${date.row.series}</p>
             <div class="proshow">
                 <ul class="clear" style="width:${(n+1)*100}%">
                     <li style="width:${1/(n+1)*100}%">
                         <img src="${date.row.sm}" />
                     </li>`;
            for(var i of laptop){
                html+=`
                     <li style="width:${1/(n+1)*100}%">
                         <img src="${i}" />
                     </li>
                `
            }
            html+=`
              </ul>
                 <!--放大镜-->
                 <div class="medium">
                     <div class="mediumDiv"></div>
                     <div class="mask"></div>
                 </div>
                 <div class="largeDiv" style="background:url('${date.row.sm}') no-repeat;background-size:300% 300%"></div>
                 <!--1-->
              <div class="icon">`;
             for(var z of smimg){
                 html+=`
                 <img src="${z}" height="100" width="100"/>
                 `
             }
             html+=`
                 </div>
                     <a id="aa" href="javascript:;" class="show_left"></a>
                     <a href="javascript:;" class="show_right"></a>
                 </div>
             </div>
             <div class="proinfos">
               <div class="inner clear">
                    <div class="block">容量 <br>${date.rowss.capacity}</div>
                    <div class="block">颜色 <br>${date.rowss.color}</div>
                    <div class="block">建议售价 <br>${date.rowss.price}</div>
                    <div class="block">说明下载 <br> ...</div>
                    <ul class="clear links">
                        <li>
                            <a id="collect" class="collect" href="javascript: ;">${str}</a>
                            <a class='wechat' href="#"></a>
                            <a class='wb' href="#"></a>
                        </li>
                        <li>
                            <a class='tm' href="#"></a>
                            <a class='jd' href="#"></a>
                        </li>
                    </ul>
               </div>
              </div>
              <div class="propic">
                <img src="${date.rowss.bigimg}"/>
              </div>`;
            $("#section").html(html);
            var html='';
            for( var q of date.rows){
               html+=`
               <li>
                        <a href="product.html?lid=${q.lid}">
                            <img src="${q.sm}"/>
                        </a>
                        <p >${q.series} <br> ${q.spec}</p>
                    </li>`
            }
            console.log(html);
            $(".morelist>ul").html(html);
        })
        .then(()=>{
              $("#collect").click(function(){
                  var a=$(this);
                  var uname = sessionStorage.getItem("uname");
                  if(uname==null){
                      $(".login").fadeIn();
                  }else if(a.html()=='收藏'){
                      $.ajax({
                          type:'GET',
                          url:'data/collect/collect_laptop_insert.php',
                          data:{
                              lid:location.search.slice(5),
                              uname
                          },
                          success:function(data){
                              $("#collect").html(data.msg);
                          },
                          error:function(){
                              alert('网络错误');
                          }
                      })
                  }else if(a.html()=='取消收藏'){
                      $.ajax({
                          type:'GET',
                          url:'data/collect/collect_laptop_delete.php',
                          data:{
                              lid:location.search.slice(5),
                              uname
                          },
                          success:function(data){
                              $("#collect").html(data.msg);
                          },
                          error:function(){
                              alert('网络错误');
                          }
                      })

                  }
              });

            var x = 0, z = 0,s="";
            $("#section .proshow>a").click(e => {
                e.preventDefault();
                var w = parseInt($(".proshow>ul>li").css("width"));
                var a = $(e.target), ul = $(".proshow>ul"), n = ul.children("li").length - 1;
                if (a.hasClass("show_right")) {
                    if (x < (n * w)) {
                        z++;
                        x = w * z;
                        ul.css("margin-left", -x);
                    } else {
                        x = 0;
                        ul.css("margin-left", -x);
                        z = 0;
                    }
                } else {
                    if (x == 0) {
                        x = n * w;
                        ul.css("margin-left", -x);
                        z = n;
                    } else {
                        z--;
                        x = z * w;
                        ul.css("margin-left", -x);
                    }
                }
                s=$(".proshow>ul>li:eq("+z+")>img").attr('src');
           $(".largeDiv").css({"background":'url('+s+') no-repeat',"background-size":"300% 300%"})
    });

        /*放大镜*/
        var $mask=$(".mask");
        var $largeDiv=$(".largeDiv");
        var SIZE=parseFloat($(".mask").css("width")),
        MAX=parseFloat($(".mediumDiv").css("width"))-SIZE,
        SIZE1=parseFloat($(".mask").css("height")),
            MAX1=parseFloat($(".mediumDiv").css("height"))-SIZE;
        $(".mediumDiv")
            .hover(()=>{
                $mask.toggle();
                $largeDiv.toggle();
            })
            .mousemove(e=>{
                //console.log(e.offsetY);
                var top=e.offsetY-SIZE1/2,
                    left=e.offsetX-SIZE/2;
                if(top<0) top=0;
                else if(top>MAX1) top=MAX1;
                if(left<0) left=0;
                else if(left>MAX) left=MAX;
                $mask.css({top,left});
                $largeDiv.css(
                    "backgroundPosition",
                    `-${left*3}px -${top*3}px`)
            });
        /**/
    (()=> {
        var x = 0, z = 0,s="";
        var q=parseInt($(".morelist").css("width"));
        $(".morelist>ul>li").css("width",(q-160)/4+"px");
        var w = parseInt($(".morelist>ul>li").css("width"));
        var ul = $(".morelist>ul"), n = ul.children("li").length-1;
        ul.css("width",(n+1)/4*101+'%');
        $("#promore>.inner>a").click(e => {
            var a = $(e.target);
            e.preventDefault();
            if (a.hasClass("show_right")) {
                if (x < (n * (w+40))){
                    z++;
                    x = (w+40) * z;
                    ul.css("margin-left", -x);
                } else {
                    x = 0;
                    ul.css("margin-left", -x);
                    z = 0;
                }
            } else {
                if (x == 0) {
                    x = n *(w+40);
                    ul.css("margin-left", -x);
                    z = n;
                } else {
                    z--;
                    x = z *(w+40);
                    ul.css("margin-left", -x);
                }
            }
        });
    })()
})
})()

