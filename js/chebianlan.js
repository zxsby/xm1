/**
 * Created by web-01 on 2017/9/20.
 */
function url(div,url,flow,dis,bai,hui){
    $("#right_lan").css("overflow",flow);
    div.removeClass(bai).addClass(hui);
    div.children().first().attr("src",url);
    div.children().last().css("display",dis);
}
$(".lan_z").on("click",".lan_hei>img",function(){
    var img=$(this);
    if(img.parent().parent().parent().css("height")!="60px"){
        img.parent().parent().parent().css({"height":60});
        img.css("transform","rotate(360deg)");
    }else{
        img.parent().parent().parent().css({"height":240});
        img.css("transform","rotate(45deg)");
    }
});
////
$("[data-div=kf]").mouseover(function(){
    var div=$(this);
    url(div,"img/index/icon_phone.png","visible","block","lan_bai","lan_hui");
});
$("[data-div=kf]").mouseleave(function(){
    var div=$(this);
    url(div,"img/index/icon_phone_d.png","hidden","none","lan_hui","lan_bai");
});
/////
$("[data-div=wx]").mouseover(function(){
    var div=$(this);
    url(div,"img/index/icon_wechat.png","visible","block","lan_bai","lan_hui");
});
$("[data-div=wx]").mouseleave(function(){
    var div=$(this);
    url(div,"img/index/icon_wechat_d.png","hidden","none","lan_hui","lan_bai");
});
////
$("[data-div=yx]").mouseover(function(){
    var div=$(this);
    url(div,"img/index/icon_mail.png","visible","block","lan_bai","lan_hui");
});
$("[data-div=yx]").mouseleave(function(){
    var div=$(this);
    url(div,"img/index/icon_mail_d.png","hidden","none","lan_hui","lan_bai");
});
$(window).scroll(()=>{
    if($(document).scrollTop()>300){
        $("#totop").css("right",0);
    }else{
        $("#totop").css("right",-60);
    }
})
$("#totop>a").click(function(){
    $("body").animate({
        "scrollTop":0
    }, 800);
});
window.onload=function(){
    if($(document).scrollTop()>300){
        $("#totop").css("right",0);
    }else{
        $("#totop").css("right",-60);
    }
}