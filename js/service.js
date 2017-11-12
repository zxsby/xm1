/**
 * Created by web-01 on 2017/10/13.
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
            $("#header .hd1>.hd2>ul").children(":eq(3)").children().first().addClass("hd1_21");
            $("#header .hd1_2").css("left",parseInt($("#header .hd1>.hd2>ul").children().first().children().first().css("width"))*3);
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
                $("#header .hd1>.hd2>ul").children(":eq(3)").children().first().addClass("hd1_21")
                // .first().addClass("hd1_21");
                $("#header .hd1_2").css("left",parseInt(li.children().first().css("width"))*3);
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
///serach//

(()=>{
    function search(questionClass){
        $.ajax({
            type:"GET",
            url:"data/questionSearch.php",
            data:{
                questionClass
            },
            success:function(data){
                console.log(data);
                var html="";
                for( i of data){
                    html+=`
                    <li>
                       <p class="question">
                           <a class="down-up">展开▽</a>${i.question}
                       </p>
                       <p class="answer">
                        ${i.answer}
                       </p>
                   </li>
                    `
                }
                console.log(html);
                $("#sq").html(html);
            },
            error:function(){
                alert("网络错误");
            }
        })
    }
    $(".searchbtn").click(function(){
        var val=$("#qna").val();
        if(val==0){
            alert("请先选择问题类别");
        }else if(val==73){
                search("真空保温类");
        }else if(val==74){
            search("焖烧锅类");
        }else if(val==75){
            search("不锈钢复合锅具类");
        }else if(val==76){
            search("婴童类");
        }else{
            search("售后");
        }
    });
    (()=>{
  function show(){

  }
        $("#sq").on("click",".down-up",function(){
            var a=$(this);
        if($("#sq").find('.menu-up').length==0){
            if (a.html() == "展开▽") {
                a.removeClass('menu-down').addClass('menu-up');
                a.parent().parent().find('.answer').slideDown();
                a.html("收起△");
            } else {
                a.removeClass('menu-up ').addClass('menu-down');
                a.parent().parent().find('.answer').slideUp();
                a.html("展开▽");

            }
        }else{
            if($("#sq").find('.menu-up')[0]!=a[0] ) {
                $("#sq").find('.menu-up').parent().parent().find('.answer').slideUp();
                $("#sq").find('.menu-up').removeClass("menu-up").html("展开▽")
                if (a.html() == "展开▽") {
                    a.removeClass('menu-down').addClass('menu-up');
                    a.parent().parent().find('.answer').slideDown();
                    a.html("收起△");
                } else {
                    a.removeClass('menu-up ').addClass('menu-down');
                    a.parent().parent().find('.answer').slideUp();
                    a.html("展开▽");

                }
            }else{
                a.removeClass('menu-up ').addClass('menu-down');
                a.parent().parent().find('.answer').slideUp();
                a.html("展开▽");
            }
        }




        })
    })()

})();
