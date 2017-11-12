/*动态加载导航*/
 (()=>{
     $.get("header.html")
	.then(html=>{
	   $("#dao_hang").html(html);
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
          "top":0,"left":0,"z-index":1,"width":"100%"});
	 })
  })();
/*动态加载底部*/
  (()=>{
     ajax("get","footer.html")
	.then(html=>{
	   $("#di_bu").html(html);
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
    function laptop(fid,id){
        $.ajax({
            type:"GET",
            url: 'data/laptop.php',
            data:{
                fid:fid
            },
            success:function(data){
            	var html='';
                for( i of data){
                	html+=`
                	<li>
						<a href="product.html?lid=${i.lid}" ><img src="${i.sm}"/></a>
						<div class="show_text">
							<p><i class="iconfont icon-i"></i>${i.spec}<br>${i.series}</p>  
						</div>
					</li>
`
                };
                $(id+" .show>ul").html(html).css({'width':data.length*100+"%","marginLeft":0}).children().css("width",1/data.length*100+'%');
            },
            error:function(){
                alert("网络故障请检查");
            }
        })

    }
    laptop(1,"#zhu_t1");
    laptop(5,"#zhu_t2");
    laptop(12,"#zhu_t3");
    laptop(14,"#zhu_t4");
    laptop(23,"#zhu_t5");

$('.show_xia>a').click(function(){
    var a=$(this);
    laptop(+a.attr('href'),"#"+a.parent().parent().parent().parent().attr('id'));

});
})()
/*导航2*/
var flag = true;
$("#dao_hang1").on("click","li",function(){
    var li=$(this);
	var i=li.index();
    flag=false;
	li.addClass("dao_bottom").siblings().removeClass("dao_bottom");
	//window.scrollBy("i*500+60");
	//$("body").scrollTop(i*500);
	var height=parseInt($("#zhu_t").css("height"));
	$("body").animate({
        "scrollTop":i*((height)/5)
    }, 500,function(){
        flag = true;
	});
})
/*滚动*/
$(window).scroll(()=>{
    if(flag){
        var height=parseInt($("#zhu_t").css("height"))/5;
        var body=$(document).scrollTop();
        var ul=$("#dao_hang1>ul");
        if(body<height){
            ul.children(":eq(0)").addClass("dao_bottom").siblings().removeClass("dao_bottom");
        }else if(height<=body&&body<2*height){
            ul.children(":eq(1)").addClass("dao_bottom").siblings().removeClass("dao_bottom");
        }else if(2*height<=body&&body<3*height){
            ul.children(":eq(2)").addClass("dao_bottom").siblings().removeClass("dao_bottom");
        }else if(3*height<=body&&body<4*height){
            ul.children(":eq(3)").addClass("dao_bottom").siblings().removeClass("dao_bottom");
        }else{
            ul.children(":eq(4)").addClass("dao_bottom").siblings().removeClass("dao_bottom");
        }
    }
});
/*主体*/
$(".show_xia").on("click","a",function(e){
	e.preventDefault();
   var a=$(this);
   if(!a.hasClass("show_xia_red")){
       var b=a.parent().find(".show_xia_red");
		   b.removeClass("show_xia_red");
	   var src=b.children().first().attr("src");
	   var alt=b.children().first().attr("alt");
           b.children().first().attr("src",alt).attr("alt",src);
		  a.addClass("show_xia_red");
	      src=a.children().first().attr("src");
	      alt=a.children().first().attr("alt");
          a.children().first().attr("src",alt).attr("alt",src);
   }
});
function move(id){
var x=0,z=0;
$(""+id+" .show>a").click(e=>{
	var w=parseInt($(".show>ul>li").css("width"));
    var a=$(e.target),ul=$(""+id+" .show>ul"),n=ul.children("li").length-1;
    if(a.hasClass("show_right")){
		if(x<(n*w)){
            z++;
		 x=w*z;ul.css("margin-left",-x);
		}else{
		  x=0;ul.css("margin-left",-x);
		  z=0;
		}   
	}else{
	    if(x==0){
		 x=n*w;ul.css("margin-left",-x);
            z=n;
		}else{
	    	z--;
		  x=z*w;ul.css("margin-left",-x);
		}
	}

});
}
move('#zhu_t1');
move('#zhu_t2');
move('#zhu_t3');
move('#zhu_t4');
move('#zhu_t5');

function jump(id){
    $("body").animate({
        "scrollTop":$(id).offset().top-117
    }, 1000,function(){
        sessionStorage.removeItem("num");
    });
}
window.onload=function(){
    var num = sessionStorage.getItem("num");
    if(num){
        if(num==1){
            jump("#zhu_t1");
        }else if(num==2){
            jump("#zhu_t2");
        }else if(num==3){
            jump("#zhu_t3");
        }else if(num==4){
            jump("#zhu_t4");
        }else{
            jump("#zhu_t5");
        }
    }
}






