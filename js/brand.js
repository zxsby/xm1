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
            $("#header .hd1>.hd2>ul").children(":eq(4)").children().first().addClass("hd1_21");
            $("#header .hd1_2").css("left",parseInt($("#header .hd1>.hd2>ul").children().first().children().first().css("width"))*4);
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
                $("#header .hd1>.hd2>ul").children(":eq(4)").children().first().addClass("hd1_21")
                // .first().addClass("hd1_21");
                $("#header .hd1_2").css("left",parseInt(li.children().first().css("width"))*4);
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
/////////////////
$(document).ready(function() {
    navTop = $('#dao_hang1').offset().top - 60;
    scrollTop = $(window).scrollTop();
    if(scrollTop > navTop){
        $('#dao_hang1>ul').addClass("fix")
    }
    var tops = [];
    //str = '';
    winHeight = $(window).height() / 3 * 2;  //226
    winWidth = $(".inner>ul").width();     //1138
    picHeight = winWidth / 12 * 5;    //475
    bltop = $(".inner>ul").offset().top - winHeight-40;
    for(var i=0; i<$(".inner>ul li").length; i++){
        tops.push(bltop);
      //  str += i + ':' + bltop + ' | ';
        bltop += picHeight;
    }

    shownav = 0;
    $(window).scroll(function () {
        navTop = $('#dao_hang1').offset().top - 60;
        scrollTop = $(window).scrollTop();
        if(scrollTop > navTop){
            $('#dao_hang1>ul').addClass("fix")
        }else{
            $('#dao_hang1>ul').removeClass("fix")
        }

        for(var i=0; i<tops.length; i++){
            if(tops[i] < scrollTop){
                $(".inner>ul  li").eq(i).addClass('show');
            }else{
                $(".inner>ul  li").eq(i).removeClass('show');
            }
        }

        t0 = $('#b1').offset().top - 120;
        t1 = $('#b2').offset().top - 120;
        t2 = $('#b3').offset().top - 120;
        if(scrollTop < t1){
            nownav = 0;
        }else if(scrollTop < t2){
            nownav = 1;
        }else{
            nownav = 2;
        }
        if(shownav !== nownav){
            $('#dao_hang1 li').eq(nownav).addClass('dao_bottom').siblings().removeClass('dao_bottom');
            shownav = nownav;
        }
    });
    function gop(i){
        i--;
        t0 = $('#b1').offset().top -119;
        t1 = $('#b2').offset().top -119;
        t2 = $('#b3').offset().top -119;
        $('#dao_hang1 li').eq(i).addClass('dao_bottom').siblings().removeClass('dao_bottom');
        $('body,html').animate({scrollTop: eval('t'+i) + 'px'}, 800);
        shownav = i;
    }
    $("#dao_hang1 li>a").click(function(e){
        e.preventDefault();
        var a=$(this);
        gop(a.attr("href"));

    })
});

/////////////////
function jump(id){
    $("body").animate({
        "scrollTop":$(id).offset().top-117
    }, 1000,function(){
        sessionStorage.removeItem("num1");
    });
}
window.onload=function(){
    var num = sessionStorage.getItem("num1");
    if(num){
        if(num==1){
            jump("#b1")
        }else if(num==2){
            jump("#b2")
        }else if(num==3){
            jump("#b3")
        }
    }
}