/**
 * Created by web-01 on 2017/9/16.
 */
(function(){
	$.get("header.html")
	.then(html=>{
	   $("#h_eader").html(html);
	   document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/header.css"><link rel="stylesheet"  href="css/iconfont.css">';
	 })
        .then(function() {
            //////////////////
            var left = parseInt($("#header .hd1>.hd2 ul>li").children().first().css("width"));
            $("#header .hd1_2").css("left", -left-1);
            $("#header .hd1>.hd2").on("mouseover", " ul>li", function () {
                var li = $(this);
                var left = parseInt(li.children().first().css("width"));
                if (!li.children().first().hasClass("hd1_21")) {
                    li.children().first().addClass("hd1_21");
                    li.siblings().children().removeClass("hd1_21");
                }

                var i = li.index();
                $("#header .hd1_2").css({"left":i * left,"opacity":1});
            });
            $("#header .hd1").on("mouseleave", "ul", function () {
                var left = parseInt($("#header .hd1>.hd2 ul>li").children().first().css("width"));
                $("#header ul>li>a").removeClass("hd1_21");
                $("#header .hd1_2").css({"left":-left-1,"opacity":1});
            });
		})
	$.get("cebianlan.html")
        .then(function(data){
          $("#right_column").html(data);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/cebianlan.css">';
        });

    $.get("footer.html")
        .then(function(data){
            $("#bottom").html(data);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/footer.css">';
        })
})();
		// /*1.对用户名进行验证*/
$("#uname").focus(function(e){
    var input = $(e.target);
    this.nextElementSibling.className = '';
    input.next().html("用户名长度在6到9位之间").addClass("msg-default")
}).blur(function(e){
    var input = $(e.target);
    if(input.val()==''){
        this.nextElementSibling.className = '';
        input.next().html("用户名不能为空").addClass(" iconfont icon-weitongguo msg-error")
        input.addClass("error").removeClass("success");
    }else if(input.val().length<5) {
        this.nextElementSibling.className = '';
        input.next().html("用户名长度小于6位").addClass(" iconfont icon-weitongguo msg-error");
        input.addClass("error").removeClass("success");
    }else{
        $.ajax({
            type:'post',
            url:"data/login/check_uname.php",
            data:{
                uname:input.val()
            },
            success:(data)=>{
                console.log(data);
                if(data.code==1){
                    this.nextElementSibling.className = '';
                    input.next().html(data.msg).addClass(" iconfont icon-tongguo1 msg-success")
                    input.addClass("success").removeClass("error");
                }else{
                    this.nextElementSibling.className = '';
                    input.next().html(data.msg).addClass(" iconfont icon-weitongguo msg-error");
                    input.addClass("error").removeClass("success");
                }
            },
            error:function(){
                alert("网络错误");
            }
        })
    }
})
// /*2.对密码进行验证*/
$("#upwd").focus(function(e){
    var input = $(e.target);
    this.nextElementSibling.className = '';
    input.next().html("密码长度在6到12位之间").addClass("msg-default")
}).blur(function(e){
      var input = $(e.target);
	  if(input.val()==''){
        this.nextElementSibling.className = '';
        input.next().html("密码不能为空").addClass(" iconfont icon-weitongguo msg-error");
          input.addClass("error").removeClass("success");
    }else if(input.val().length<6){
		this.nextElementSibling.className = '';
        input.next().html("密码长度不能少于6位").addClass(" iconfont icon-weitongguo msg-error");
          input.addClass("error").removeClass("success");
	}else{
	    this.nextElementSibling.className = '';
        input.next().html("密码格式正确").addClass(" iconfont icon-tongguo1 msg-success");
          input.addClass("success").removeClass("error");
	}
}).keyup(function(e){
    var input = $(e.target);
    var num=input.val().length;
    var ml= $("#m1");
    ml.val(num*10);
    if(0<num&&num<6){
        ml.next().css({"color":"#d00","display":"inline-block"});
    }else if(6<=num&&num<9){
        ml.next().css({"color":"#E8CC4A","display":"inline-block"});
        ml.next().html("中");
    }else if(9<=num){
        ml.next().css({"color":"#0d0","display":"inline-block"});
        ml.next().html("强");
    }else{
        ml.next().css("display","none");
    }
});
// /*3.对确认密码验证*/
$("#upwdconfirm").focus(function(e){
    var input = $(e.target);
    this.nextElementSibling.className = '';
    input.next().html("密码长度在6到12位之间").addClass("msg-default")
}).blur(function(e){
	 var val=$("#upwd").val();
      var input = $(e.target);
	  if(input.val()==''){
        this.nextElementSibling.className = '';
        input.next().html("密码不能为空").addClass(" iconfont icon-weitongguo msg-error")
          input.addClass("error").removeClass("success");
    }else if(input.val().length<6){
		this.nextElementSibling.className = '';
        input.next().html("密码长度不能少于6位").addClass(" iconfont icon-weitongguo msg-error");
          input.addClass("error").removeClass("success");
	}else if(input.val()!=val){
	    this.nextElementSibling.className = '';
        input.next().html("两次输入的密码不一致").addClass(" iconfont icon-weitongguo msg-error ");
          input.addClass("error").removeClass("success");
	}else{
		this.nextElementSibling.className = '';
        input.next().html("两次输入的密码一致").addClass(" iconfont icon-tongguo1 msg-success");
          input.addClass("success").removeClass("error");
	}
})
// /*4.对邮箱地址进行验证*/
$("#email").focus(function(e){
       var input = $(e.target);
    this.nextElementSibling.className = '';
    input.next().html("请输入合法的邮箱地址").addClass("msg-default")
}).blur(function(e){
    var input = $(e.target);
	  if(input.val()==''){
        this.nextElementSibling.className = '';
        input.next().html("邮箱不能为空").addClass(" iconfont icon-weitongguo msg-error");
          input.addClass("error").removeClass("success");
    }else if(input.val().search( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)==-1){
		this.nextElementSibling.className = '';
        input.next().html("邮箱格式不正确").addClass(" iconfont icon-weitongguo msg-error");
          input.addClass("error").removeClass("success");
	}else{
		$.ajax({
		    type:"GET",
		    url:"data/login/check_emali.php",
			data:{
			    email:input.val()
			},
			success:(data)=>{
                console.log(data);
                if(data.code==1){
                    this.nextElementSibling.className = '';
                    input.next().html(data.msg).addClass(" iconfont icon-tongguo1 msg-success");
                    input.addClass("success").removeClass("error");
                }else{
                    this.nextElementSibling.className = '';
                    input.next().html(data.msg).addClass(" iconfont icon-weitongguo msg-error");
                    input.addClass("error").removeClass("success");
                }
            },
            error:function(){
                alert("网络错误");
            }
		})
	}
})
$("#phone").focus(function(e){
    var input = $(e.target);
    this.nextElementSibling.className = '';
    input.next().html("请输入合法的手机号").addClass("msg-default")
}).blur(function(e){
    	var input = $(e.target);
	  if(input.val()==''){
        this.nextElementSibling.className = '';
        input.next().html("手机号不能为空").addClass(" iconfont icon-weitongguo msg-error")
          input.addClass("error").removeClass("success");
	  }else if(input.val().search(/^1[3|4|5|7|8][0-9]{9}$/)==-1){
	     this.nextElementSibling.className = '';
        input.next().html("手机号格式不正确").addClass(" iconfont icon-weitongguo msg-error");
          input.addClass("error").removeClass("success");
	  }else{
	     	$.ajax({
		    type:"GET",
		    url:"data/login/check_phone.php",
			data:{
			    phone:input.val()
			},
			success:(data)=>{
                console.log(data);
                if(data.code==1){
                    this.nextElementSibling.className = '';
                    input.next().html(data.msg).addClass(" iconfont icon-tongguo1 msg-success");
                    input.addClass("success").removeClass("error");
                }else{
                    this.nextElementSibling.className = '';
                    input.next().html(data.msg).addClass(" iconfont icon-weitongguo msg-error");
                    input.addClass("error").removeClass("success");
                }
            },
            error:function(){
                alert("网络错误");
            }
		})
	  }
});
(()=>{
    //1:创建二个变量保存验证码的宽度和高度
       var w = 120;
       var h = 30;
       //2:将变量值赋值canvas
       c3.width = w;
       c3.height = h;
       //3:获取画笔
       var ctx = c3.getContext("2d");
       //4:创建二个函数，返回指定范围内的随机数，和随机颜色
       function rn(min,max){
           var n = Math.random()*(max-min)+min;
           return Math.floor(n);
       }
       function rc(min,max){
           var r = rn(min,max);
           var g = rn(min,max);
           var b = rn(min,max);
           return  `rgb(${r},${g},${b})`;
       }
	   var str = "";
  function one(){
       //5:填充背景
       ctx.fillStyle = rc(180,230);
       ctx.fillRect(0,0,w,h);
       //6:创建随机文字[字母和数字]4
       var pool = "ABCDEFabcde0123456789";
        str = "";
       for(var i=0;i<4;i++){
           var index = Math.floor(Math.random()*pool.length);
           str += pool[index];
       }
       //console.log(str);
       ctx.font = "30px SimHei";
       ctx.fillStyle = rc(80,180);
       ctx.textBaseline = "top";
       ctx.fillText(str,30,0);
       //7:绘制6条干扰线
       for(var i=0;i<6;i++){
           ctx.strokeStyle = rc(0,255);
           ctx.beginPath();
           ctx.moveTo(rn(0,w),rn(0,h));
           ctx.lineTo(rn(0,w),rn(0,h));
           ctx.stroke();
       }
       //8:绘制50个干扰点 9:46--9:49
       for(var i=0;i<50;i++){
           ctx.fillStyle = rc(0,255);
           ctx.beginPath();
           ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
           ctx.fill();
       }
}
	  one();
	  $(".canvas").click(function(){
	     one();
		  var input = $("#verify");
		  if(input.val().toUpperCase()!=str.toUpperCase()){
		    verify.nextElementSibling.nextElementSibling.className = '';
           input.next().next().html("验证码不正确").addClass(" iconfont icon-weitongguo msg-error")
              input.addClass("error").removeClass("success");
		 }
	  })
	  $("#verify").focus(function(e){
	     var input = $(e.target);
		this.nextElementSibling.nextElementSibling.className = '';
		input.next().next().html("请输入正确的验证码").addClass("msg-default")
	  }).blur(function(e){
			var input = $(e.target);
	     if(input.val().toUpperCase()!=str.toUpperCase()){
		    this.nextElementSibling.nextElementSibling.className = '';
        input.next().next().html("验证码不正确").addClass(" iconfont icon-weitongguo msg-error")
             input.addClass("error").removeClass("success");
             one();
		 }else{
		   this.nextElementSibling.nextElementSibling.className = '';
           input.next().next().html("验证码正确").addClass(" iconfont icon-tongguo1 msg-success");
             input.addClass("success").removeClass("error");
		}	
	  })
})()
  $(".portrait").on("click","li",function(){
      var li=$(this);
      li.addClass("active");
      li.siblings().removeClass("active");
  });
    //1.阻止浏览器的默认行为
    $(document).on({
        //拖动着离开
        dragleave:function(e){e.preventDefault();},
        //拖动着释放
        drop:function(e){e.preventDefault();},
        //拖动着进入
        dragenter:function(e){e.preventDefault();},
        //拖动着悬停
        dragover:function(e){e.preventDefault();},
    });
    //2.获取    拖拽区域    绑定drop
    var url="";
    var box=document.getElementById("drop_area");
    box.addEventListener("drop",function(e){
        //3.阻止默认行为
        e.preventDefault();
        //4.获取文件对象信息
        var fileList = e.dataTransfer.files;
        console.log(fileList);
        //5.判断文件大小 判断文件类型
        var size = fileList[0].size;
        var type = fileList[0].type;
        var name = fileList[0].name;
        if (size > 2 * 1024 * 1024) {
            $("#avatar").html("上传文件不能超过两兆").addClass(" iconfont icon-weitongguo msg-error")
            alert("上传文件不能超过两兆");
            return;
        }
        if (type.indexOf("image") == -1) {
            $("#avatar").html("您拖拽的不是图片").addClass(" iconfont icon-weitongguo msg-error")
            alert("您拖拽的不是图片");
            return;
        }
        //7.AJAX上传
        var xhr=new XMLHttpRequest();
        xhr.open("post","data/login/user_upload.php",true);
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        //xhr.responseText;
        var fd=new FormData();
        fd.append("mypic",fileList[0]);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200) {
                $("#avatar").html("头像上传成功").addClass(" iconfont icon-tongguo1 msg-success");
                url = "data/" + xhr.responseText;
                $(".portrait").append(`
                  <li>
                      <img src="${url}" alt="">
                  </li>
                `)
            }
        };
        xhr.send(fd);

    });
$("#btn").click(function(){
    if($(".msg-error").length===0&&$("#check").prop("checked")==true){
        $.ajax({
            type:'post',
            url:'data/login/user_insert.php',
            data:{
                email:$("#email").val(),
                uname:$("#uname").val(),
                upwd:$("#upwd").val(),
                phone:$("#phone").val(),
                avatar:$(".active").children().first().attr('src'),
            },
            success:function(data){
                // console.log(data);
                if(data.code==1){
                    var i=5;
                    var timer=setInterval(function(){
                        $("#sect").html(`
                       <div class="href">${data.msg}${i--}秒后跳转到首页</div>
                    `)
                    },1000);
                    setTimeout(function(){
                        clearInterval(timer);
                        timer=null;
                        location.assign("index.html");
                        sessionStorage.setItem("log",1);
                    },5000)
                }else{
                    alert('注册失败');
                }
            }
        })
    }
})


// /**注册按钮监听函数**/
// $('#bt-register').click(function () {
//     var count = 0;
//     $('.form-group').each(function () {
//         if ($(this).find('span').hasClass('msg-success')) {
//             count++;
//         }
//     });
//     if (count == 5) {
//         $.ajax({
//                 type: 'POST',
//                 url: 'data/user/register.php',
//                 data: $('#form-register').serialize(),
//                 success: function(result){
//                     if(result.code===200){
//                         alertMsg('<b>注册成功！</b><p>点击“确定”后将跳转到登录页</p>')
//                         $('#alertMsg').on('click', '#alertMsg_btn1 cite', function (e) {
//                             e.preventDefault();
//                             location.href = 'login.html';
//                         })
//                     }else {
//                         alertMsg('<b>注册失败！</b><p>错误消息：'+result.msg+'</p>')
//                     }
//                 }
//             }
//         )
//     }
// })