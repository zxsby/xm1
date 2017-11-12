/**
 * Created by web-01 on 2017/10/10.
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
            var left = parseInt($("#header .hd1>.hd2 ul>li").children().first().css("width"));
            $("#header .hd1_2").css("left", -left-1);
            $("#header .hd1>.hd2").on("mouseover"," ul>li",function(){
                var li=$(this);
                if(!li.children().first().hasClass("hd1_21")){
                    li.children().first().addClass("hd1_21");
                    li.siblings().children().removeClass("hd1_21");
                }
                var left=parseInt(li.children().first().css("width"));
                var i=li.index();
                $("#header .hd1_2").css({"left":i * left,"opacity":1});
            });
            $("#header .hd1").on("mouseleave","ul",function(){
                var left = parseInt($("#header .hd1>.hd2 ul>li").children().first().css("width"));
                $("#header ul>li>a").removeClass("hd1_21");
                $("#header .hd1_2").css({"left":-left-1,"opacity":1});
            });
            $(".hd1").css({"position":"fixed",
                "top":0,"left":0,"z-index":1,"width":"100%"});
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
(()=>{
    var uname = sessionStorage.getItem("uname");
    // $.ajax({
    //     type:'GET',
    //     url:'data/collect/collect_recipe.php',
    //     data:{
    //         uname
    //     },
    //     success:function(data){
    //         console.log(data);
    //     },
    //     error:function(){
    //         alert("网络错误");
    //     }
    // })
    $.ajax({
        type:'GET',
        url:'data/collect/collect_article.php',
        data:{
            uname
        },
        success:function(data){
            console.log(data);
            var html='';
            for (i of data) {
                    html += `
                    <li >
                      <a href="javascript: ;">
                          <img src="img/article/${i.img}">
                      </a>
                      <a href="javascript: ;"><i class="iconfont icon-bi-copy"></i>${i.title}</a>
                   </li>`
            }
            $("#zhuti>div>ul").html(html);
        },
        error:function(){
            alert("网络错误");
        }
    })
    $("#dao_hang1").on("click","li",function(){
        var li=$(this);
      //  kw=li.children().first().html();
        flag=false;
        li.addClass("dao_bottom").siblings().removeClass("dao_bottom");
        if(li.children().first().html()=='文章'){
            $.ajax({
                type:'GET',
                url:'data/collect/collect_article.php',
                data:{
                    uname
                },
                success:function(data){
                    console.log(data);
                    var html='';
                    for (i of data) {
                        html += `
                    <li >
                      <a href="javascript: ;">
                          <img src="img/article/${i.img}">
                      </a>
                      <a href="javascript: ;"><i class="iconfont icon-bi-copy"></i>${i.title}</a>
                   </li>`
                    }
                    $("#zhuti>div>ul").html(html);
                },
                error:function(){
                    alert("网络错误");
                }
            })
        }else if(li.children().first().html()=='视频'){
                $.ajax({
                    type:'GET',
                    url:'data/collect/collect_video.php',
                    data:{
                        uname
                    },
                    success:function(data){
                        console.log(data);
                        var html='';
                        for (i of data) {
                            html += `
                    <li >
                      <a href="javascript: ;">
                          <img src="img/article/${i.img}">
                      </a>
                      <a href="javascript: ;"><i class="iconfont icon-bofang1"></i>${i.title}</a>
                   </li>`
                        }
                        $("#zhuti>div>ul").html(html);
                    },
                    error:function(){
                        alert("网络错误");
                    }
                })
        }else if(li.children().first().html()=='产品'){
                    $.ajax({
                        type:'GET',
                        url:'data/collect/collect_laptop.php',
                        data:{
                            uname
                        },
                        success:function(data){
                            console.log(data);
                            var html='';
                            for (i of data) {
                                html += `
                                    <li >
                                      <a href="product.html?lid=${i.lid}">
                                          <img src="${i.sm}">
                                      </a>
                                      <a href="product.html?lid=${i.lid}">${i.spec}</a>
                                   </li>`
                            }
                            $("#zhuti>div>ul").html(html);
                        },
                        error:function(){
                            alert("网络错误");
                        }
                    })
        }else{
            $.ajax({
                type:'GET',
                url:'data/collect/collect_recipe.php',
                data:{
                    uname
                },
                success:function(data){
                    console.log(data);
                    var html='';
                    for (i of data) {
                        html += `
                                    <li >
                                      <a href="javascript: ;">
                                          <img src="${i.img}">
                                      </a>
                                      <a href="javascript: ;">${i.lname}</a>
                                   </li>`
                    }
                    $("#zhuti>div>ul").html(html);
                },
                error:function(){
                    alert("网络错误");
                }
            })
        }
        //article(1,kw);

    })


})()