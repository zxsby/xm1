/**
 * Created by web-01 on 2017/9/14.
 */
(()=>{
    var uname = sessionStorage.getItem("uname");
    if(uname){
        var img='';
        $.ajax({
            type:'GET',
            url:'data/header/img.php',
            data:{
                uname
            },
            success:function(data){
                 img=data.avatar;
            },
            error:function(){
                alert('网络错误');
            }
        }).then(()=>{
        $(".hd1").append( `
             <div class="hd_user">
							<div class="user_pic">
								<img src="${img}" height="40" width="40"/>
								<span>${uname}</span>
							</div>
							<div class="user_zhongxin">
								<p><a href="collect.html" class="iconfont icon-xingzhuang60kaobei2">我的收藏</a></p>
								<p><a href="" class="iconfont icon-shezhi1">账号设置</a></p>
								<p><a href="" class="iconfont icon-tuichu user_out">退出</a></p>
							</div>
				</div>
          `)
        }).then(()=>{
            //////////////登录成功//////////////////
            $(".hd_user").mouseover(function(){
                $(".user_zhongxin").css("height",180);
            }).mouseout(function(){
                $(".user_zhongxin").css("height",0);
            });
            $(".user_zhongxin").on("mouseover","a",function(){
                var a=$(this);
                a.css("color","white").parent().css("background","#c8c8c8");
            }).on("mouseout","a",function(){
                var a=$(this);
                a.css("color","#555").parent().css("background","white");
            });
            $(".user_out").click(function(){
                sessionStorage.removeItem("uname");
                history.go(0);
                // location.href = "get(0)";
            })
        })
    }else{
        $(".hd1").append(`<div class="hd1_4">
							    <a href="#">登录/注册</a>
							</div>`);
    }
})()
/////////////////////////////

$("#header .hd1").on("mouseleave","ul",function(){
    $("#header ul>li>a").removeClass("hd1_21").first().addClass("hd1_21");
    $("#header .hd1_2").css("left",0);
});
/////////登录//////////////
$("#header").on("click",".hd1_4",e=>{
    $(".login").fadeIn();
})
$(".log_close").mouseover(function(){

    var a=$(this);
    a.children().first().css("transform","rotate(360deg)");
}).mouseout(function(){
    var a=$(this);
    a.children().first().css("transform","rotate(0deg)");
}).click(e=>{
    $(".login").fadeOut();
})
/////验证登录///////
function check(str){
    $(".login_yanzheng").fadeIn().children().last().html(str);
    setTimeout(function(){
        $(".login_yanzheng").fadeOut();
    },1500);
}
$("#login_login").click(e=>{
    var btn=$(e.target);
    var uname=btn.prev().prev().val();
    var upwd=btn.prev().val();
    //console.log(uname,pwd);
    if(uname==""||upwd==""){
        // $(".login_yanzheng").css({"opacity":"1","z-index":"100"}).children().last().html("用户密码或账户不能为空");
        // setTimeout(function(){
        //     $(".login_yanzheng").css({"opacity":"0","z-index":"-10"})
        // },1500);
        check("用户密码或账户不能为空");
    }else{
        $.ajax({
            type:"POST",
            url:"data/upload.php",
            data:{uname,upwd},
            success(data){
                //console.log(data);
                if(data.code==1){
                    sessionStorage.setItem("uname",data.uname);
                    history.go(0);
                }else{
                    check(data.msg)
                }
            },
            error:function(){
                check("网络错误");
            }
        })
    }
})

$("#sear").keyup(function(){
      var put=$(this);
      var val=put.val();
    if(val!=""){
      $("#search").css("display","block");
        $.ajax({
            type:"GET",
            url: 'data/search.php',
            data:{
                kw:val
            },
            success:function(data){
                console.log(data);
                if(data.length>0) {
                    var html = '';
                    for (var i of data) {
                        html += `
                   <li title="${i.series}">
                      <div ">${i.spec}&nbsp&nbsp&nbsp <span>${i.series}</span></div>
                   </li>`
                    }
                    $("#search").html(html);
                }else{
                    $("#search").html("未找到匹配商品");
                }
            },
            error:function(){
                alert("网络故障请检查");
            }
        })

      // $.ajax({
      //     type:'get',
      //     url:'data/search.php',
      //     data:{
      //         kw:val
      //     },
      //     success:function(data){
      //         console.log(data);
      //     },
      //     error:function(){
      //         alert("网络错误");
      //     }
      // })
    }else{
        $("#search").css("display","none");
    }
})
//     .blur(function(){
//     $("#search").css("display","none");
// })
// function(e){
//     if(e.target.nodeName=="li"){
//         $("#sear").val(e.target.parentNode.title);
//         setTimeout(
//             ()=>location="04-products.html?kw="+$("#sear").val()
//             ,500);
//     }
// }
$("#search").on("click","div",
    function(e){
    console.log(1);
        if(e.target.nodeName=="DIV"){
            $("#sear").val(e.target.parentNode.title);
            setTimeout(
                ()=>location="search.html?kw="+$("#sear").val()
                ,500);
        }
    })
$("#sub").click(function(e){
    e.preventDefault();
    if($("#sear").val()!="")
        location="search.html?kw="+$("#sear").val();
})