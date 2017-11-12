/**
 * Created by Administrator on 2017/10/7 0007.
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
            $("#header .hd1>.hd2>ul").children(":eq(2)").children().first().addClass("hd1_21");
            $("#header .hd1_2").css("left",parseInt($("#header .hd1>.hd2>ul").children().first().children().first().css("width"))*2);
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
                $("#header .hd1>.hd2>ul").children(":eq(2)").children().first().addClass("hd1_21")
                // .first().addClass("hd1_21");
                $("#header .hd1_2").css("left",parseInt(li.children().first().css("width"))*2);
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
/**/
(()=>{
    function article(pno,fname){
        $.ajax({
              type:"GET",
              url:"data/article.php",
              data:{
                  pno,
                  fname
              },
            success:function(data){
                console.log(data);
                var html='';
                for (i of data.data) {
                    if(i.family_name=='文章'){
                    html += `
                    <li >
                      <a href="javascript: ;">
                          <img src="img/article/${i.img}">
                      </a>
                      <a href="javascript: ;"><i class="iconfont icon-bi-copy"></i>${i.title}</a>
                   </li>`
                    }else{
                        html += `
                    <li >
                      <a href="javascript: ;">
                          <img src="img/article/${i.img}">
                      </a>
                      <a href="javascript: ;"><i class="iconfont icon-bofang1"></i>${i.title}</a>
                   </li>`
                    }
                }
             $("#zhuti>div>ul").html(html);
                var html = `<li><a href="${data.pageCount}">上一页</a></li>`;
                //判断是否显示上上一页
                if (data.pno - 2 > 0) {
                    html += `<li><a href="${data.pno - 2}">${data.pno - 2}</a></li>`;
                }
                //判断是否显示上一页
                if (data.pno - 1 > 0) {
                    html += `<li><a href="${data.pno - 1}">${data.pno - 1}</a></li>`;
                }
                html += `<li><a class="active" href="${data.pno}">${data.pno}</a></li>`;
                //判断是否显示下一页
                if (data.pno + 1 <= data.pageCount) {
                    html += `<li><a href="${data.pno + 1}">${data.pno + 1}</a></li>`;
                }
                //判断是否显示下下一页
                if (data.pno + 2 <= data.pageCount) {
                    html += `<li><a href="${data.pno + 2}">${data.pno + 2}</a></li>`;
                }
                html += `<li ><a href="${data.pageCount}">下一页</a></li>`;
                $('#paging>ul').html(html);
            },
            error:function(){
                alert("网络错误");
            }
        })
    }
    (()=>{
        var zx = sessionStorage.getItem("zx");
            if(zx==1){
               $("#dao_hang1>ul li:nth-child(2)").addClass("dao_bottom").siblings().removeClass("dao_bottom");
                article(1,'视频');
                sessionStorage.removeItem("zx");
            }else{
                article(1,'文章');
                sessionStorage.removeItem("zx");
            }

    })()

    var kw=$(".dao_bottom>a").html();
    $("#paging>ul").on("click","li a",e=>{
        e.preventDefault();
        var a=$(e.target);
        var n=parseInt($("#paging>ul>li>a.active").html());
        if(a.parent().is(":first-child")){
            if(n>1)
                article(n-1,kw);
        }
        else if(a.parent().is(":last-child")){
            if(n<+a.attr('href'))
                article(n+1,kw);
        }else article(a.html(),kw);
    });
    $("#dao_hang1").on("click","li",function(){
        var li=$(this);
          kw=li.children().first().html();
        flag=false;
        li.addClass("dao_bottom").siblings().removeClass("dao_bottom");
        article(1,kw);

    })
})()