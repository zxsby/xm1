/*底部*/
  (()=>{
     ajax("get","footer.html")
	.then(html=>{
	   $("#di_bu").html(html);
	   document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/footer.css">';
	 })
  
  })();
 /*头*/
  (()=>{
     $.get("header.html")
	.then(html=>{
	   $("#dao_hang").html(html);
	   document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/header.css"><link rel="stylesheet"  href="css/iconfont.css">';
	 })
         .then(()=>{
             $("#header .hd1_2").css("opacity",1);
             $("#header .hd1>.hd2>ul").children(":eq(0)").children().first().addClass("hd1_21");
             $("#header .hd1_2").css("left",0);
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
                 $("#header ul>li>a").removeClass("hd1_21").first().addClass("hd1_21");
                 $("#header .hd1_2").css("left",0);
                 $("#header .hd1_2").css("opacity",1);
             });
             $(window).scroll(()=>{
                 if($("body").scrollTop()>=600){
                     console.log("a");
                     $("#header>.hd1").addClass("fixed_nav");}
                 else
                     $("#header>.hd1").removeClass("fixed_nav");
             })
         })
  })();
/**/
/*主体2*/
	$("#section2>.clear").on("mouseover","li",function(){
	   var li=$(this);
	   li.children().last().css("left",0);
	});
	$("#section2>.clear").on("mouseleave","li",function(){
	   var li=$(this);
	   li.children().last().css("left","-100%");
	});
/*侧边栏*/
  $.get("cebianlan.html")
        .then(function(data){
          $("#zuocbl").html(data);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/cebianlan.css">';
        });
/*轮播*/
setTimeout(function(){
    $("#lb .lb1 li:nth-child(1) .lb_li_left").addClass("lb_li_left1");
},1000);
setTimeout(function(){
    $("#lb .lb1 li:nth-child(1) .lb_li_touming").addClass("lb_li_touming1");
},2000);
	(()=>{
		var n=0,timer=null,INTERVAL=5000,TRANS=800;
		var width=parseInt($("#lb>.lb1>li").css("width"));
	    function moveOnce(){
		   width=parseInt($("#lb>.lb1>li").css("width"));
		   n++;
			  if(n<7){
                  var left=n*width;
				  $("#lb .lb1").css("left",(-left));
                  if(n==6){
                      $("#lb .lb2>ul li:nth-child(1)").children().addClass("lb2li");
                      $("#lb .lb2>ul li:nth-child(1)").siblings().children().removeClass("lb2li");
                      setTimeout(function(){
                          $(".lb_li_left").removeClass("lb_li_left1");
                          $("#lb .lb1 li:nth-child("+(n+1)+") .lb_li_left").addClass("lb_li_left1");
                          $("#lb .lb1 li:nth-child(1) .lb_li_left").addClass("lb_li_left1");
                      },1000);
                      setTimeout(function(){
                          $(".lb_li_touming").removeClass("lb_li_touming1");
                          $("#lb .lb1 li:nth-child("+(n+1)+") .lb_li_touming").addClass("lb_li_touming1");
                          $("#lb .lb1 li:nth-child(1) .lb_li_touming").addClass("lb_li_touming1");
                      },2000);
				  }else{
                      $("#lb .lb2>ul li:nth-child(" + (n + 1) + ")").children().addClass("lb2li");
                      $("#lb .lb2>ul li:nth-child(" + (n + 1) + ")").siblings().children().removeClass("lb2li");
                      setTimeout(function(){
                          $(".lb_li_left").removeClass("lb_li_left1");
                          $("#lb .lb1 li:nth-child("+(n+1)+") .lb_li_left").addClass("lb_li_left1");
                      },1000);
                      setTimeout(function(){
                          $(".lb_li_touming").removeClass("lb_li_touming1");
                          $("#lb .lb1 li:nth-child("+(n+1)+") .lb_li_touming").addClass("lb_li_touming1");
                      },2000);
                  }
			  }else{
                  setTimeout(()=>{
                       	$(".lb1").css("transition","all 0s linear");
                           $("#lb .lb1").css("left",0);
                           n=0;
					  setTimeout(()=>{
                              $(".lb1").css("transition","all 0.8s linear");
                          moveOnce();
                        },100)
                       },0);
			  }
	   }
		 timer=setInterval(moveOnce,INTERVAL+TRANS);
		   $("#lb>.lb1").mouseover(function(){
				clearInterval(timer);
				timer=null;
		   })
			$("#lb>.lb1").mouseleave(function(){
			   timer=setInterval(moveOnce,INTERVAL+TRANS);
		   })
			$("#lb>.lb2").on("click","a",e=>{
			  var a=$(e.target);
			  var i=a.parent().index();
			  n=i;
			  $("#lb .lb1").css("left",(-n*width));
			  $("#lb .lb2>ul li:nth-child("+(n+1)+")").children().addClass("lb2li");
			  $("#lb .lb2>ul li:nth-child("+(n+1)+")").siblings().children().removeClass("lb2li");
                setTimeout(function(){
                    $(".lb_li_left").removeClass("lb_li_left1");
                    $("#lb .lb1 li:nth-child("+(n+1)+") .lb_li_left").addClass("lb_li_left1");
                },1000);
                setTimeout(function(){
                    $(".lb_li_touming").removeClass("lb_li_touming1");
                    $("#lb .lb1 li:nth-child("+(n+1)+") .lb_li_touming").addClass("lb_li_touming1");
                },2000);
		   })
	})();
/*轮播右上*/
	$("#lb>.lb3").on("mouseover","li",function(){
		var li=$(this);
		var i=li.children().first().attr("alt");
	   $("#lb>.lb3 "+i+"").css("display","block");
	})
	$("#lb>.lb3").on("mouseleave","li",function(){
		var li=$(this);
		var i=li.children().first().attr("alt");
	   $("#lb>.lb3 "+i+"").css("display","none");
	})
/*主体3*/
$("#section3>ul").on("mouseover","li",function(){
    var li=$(this);
     li.css("transform","rotateY(180deg)")
})
$("#section3>ul").on("mouseleave","li",function(){
    var li=$(this);
    li.css("transform","rotateY(0deg)")
})

window.onload=function(){
    var log = sessionStorage.getItem("log");

        if(log==1){
            $(".login").css("display","block");
            sessionStorage.removeItem("log");
        }

}











