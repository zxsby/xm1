/**
 * Created by web-01 on 2017/9/8.
 */
(function(){
    $.get("header.html")
        .then(function(data){
          $("#tou").html(data);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/header.css"><link rel="stylesheet"  href="css/iconfont.css">';
    })
        .then(function() {
            $("#header .hd1_2").css("opacity",1);
            var move=parseInt($("#header .hd1>.hd2>ul").children().first().children().first().css("width"));
            $("#header .hd1>.hd2>ul").children(":eq(5)").children().first().addClass("hd1_21");
            $("#header .hd1_2").css("left",move*5);
            $("#header .hd1>.hd2").on("mouseover", " ul>li", function () {
                var li = $(this);
                if (!li.children().first().hasClass("hd1_21")) {
                    li.children().first().addClass("hd1_21");
                    li.siblings().children().removeClass("hd1_21");
                }
                var left = parseInt(li.children().first().css("width"));
                var i = li.index();
                $("#header .hd1_2").css("left", i * left);
            });
            $("#header .hd1").on("mouseleave", "ul", function () {
                $("#header ul>li>a").removeClass("hd1_21");
                $("#header .hd1>.hd2>ul").children(":eq(5)").children().first().addClass("hd1_21")
                $("#header .hd1_2").css("left", move*5);
                $("#header .hd1_2").css("opacity",1);
            });
        });
    $.get("cebianlan.html")
        .then(function(data){
          $("#zuocbl").html(data);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/cebianlan.css">';
        })
    $.get("footer.html")
        .then(function(data){
            $("#dibu").html(data);
            document.head.innerHTML=document.head.innerHTML+'<link rel="stylesheet" href="css/footer.css">';
        })

})();
/*食谱*/
(()=>{
    function recipe(pno,kw){
        $.ajax({
            type:'get',
            url:'data/recipe.php',
            data:{
                kw,
                pno
            },
            success:function(data){
               console.log(data);
                var html='';
                for(i of data.data){
                    html+=`
                    <li data-lid="${i.lid}">
                      <a href="javascript: ;">
                          <img src="${i.img}">
                      </a>
                      <a href="javascript: ;">${i.lname}</a>
                   </li>`
                }
                $('#zhuti ul').html(html);
                var html = `<li><a href="${data.pageCount}">上一页</a></li>`;
                //判断是否显示上上一页
                if(data.pno-2>0){
                    html += `<li><a href="${data.pno-2}">${data.pno-2}</a></li>`;
                }
                //判断是否显示上一页
                if(data.pno-1>0){
                    html += `<li><a href="${data.pno-1}">${data.pno-1}</a></li>`;
                }
                html += `<li><a class="active" href="${data.pno}">${data.pno}</a></li>`;
                //判断是否显示下一页
                if(data.pno+1<=data.pageCount){
                    html += `<li><a href="${data.pno+1}">${data.pno+1}</a></li>`;
                }
                //判断是否显示下下一页
                if(data.pno+2<=data.pageCount){
                    html += `<li><a href="${data.pno+2}">${data.pno+2}</a></li>`;
                }
                html += `<li ><a href="${data.pageCount}">下一页</a></li>`;
                $('#paging>ul').html(html);
            },
            error:function(){
                alert("网络故障请检查");
            }
        })
    }
    recipe();
    // $("#paging>ul").on("click","li a",function(e){
    //    //console.log(2);//事件绑定对象
    //     //a:阻止事件默认行为 a
    //     e.preventDefault();
    //     var a=$(this);
    //     //b:获取当前页码
    //     if(!a.parent().is(":first-child")&&!a.parent().is(":last-child")){
    //     var pno = $(this).attr("href");
    //     //c:调用函数
    //     recipe(pno);
    //     }
    // });
    //上一页下一页
    var str='';
    $("#paging>ul").on("click","li a",e=>{
        e.preventDefault();
        var a=$(e.target);
        var n=parseInt($("#paging>ul>li>a.active").html());
        if(a.parent().is(":first-child")){
            if(n>1)
                recipe(n-1,str);
        }
        else if(a.parent().is(":last-child")){
            if(n<+a.attr('href'))
                recipe(n+1,str);
        }else recipe(a.html(),str);
    });
    $('#tou2 li>div>a').click(function(e){
        e.preventDefault();
        var a=$(this);
        str=a.html();
        recipe(1,str);
    })
    $('#all').click(function(){
        str=this.innerHTML;
        recipe(1,str);
    })
})()
/*导航2*/
$("#tou2").on("mouseover","ul>li",function(){
    var li=$(this);
    li.children().first().children("span").html("△");
    li.children().last().css({"max-height":300,"border-top":"6px solid #e2001a"});
}).on("mouseleave","ul>li",function(){
    var li=$(this);
    li.children().first().children("span").html("▽");
    li.children().last().css({"max-height":0,"border-top":"0px"});
}).on("click","ul>li>div>a",function(){
    var a=$(this);
    a.addClass("huise");
    a.siblings().removeClass("huise");
})
/*主体*/
$("#zhuti").on("click","div>ul>li",function(){
    var uname = sessionStorage.getItem("uname");
    var li=$(this);
    var lid=li.data('lid');
    if(uname==null){
        $("#collect").addClass('fenxiang1').removeClass("fenxiang1_1");
    }else{
      $.ajax({
          type:'get',
          url:'data/collect/collect_recipe_select.php',
          data:{
              uname,
              lid
          },
          success:function(data){
              console.log(data);
              if(data.code==-1){
                  $("#collect").addClass('fenxiang1').removeClass("fenxiang1_1");
              }else{
                  $("#collect").addClass('fenxiang1_1').removeClass("fenxiang1");
              }
          },
          error:function(){
              alert('网络错误');
          }
      })
    }

       $.ajax({
           type:'get',
           url:'data/recipe1.php',
           data:{
               lid
           },
           success:function(data){
              // console.log(data);
               var arr=(data[0].material.split('//'));
               var arr1=(data[0].practice.split('。'));
               var html1='';
               for(var i=0;i<arr1.length-1;i++){
                   html1+=`
                    <p>${arr1[i]}</p>`
               }
              // console.log(html1);
               var html='';
               for(var i=0;i<arr.length-1;i+=2){
                   html+=`
                   <li>${arr[i+1]}<span>${arr[i]}</span></li>`

               }
               console.log(html);
               var html2='';
               html2+=`
               <div class="mt_left">
                     <img src="${data[0].img}">
                     <div>
                         <p>Tips</p>
                         <p>
                             ${data[0].tips}
                         </p>
                     </div>
                 </div>
                 <div class="mt_right">
                       <div>
                           <div class="mt_r_text">
                               <p class="text_big">${data[0].lname}</p>
                               <p>${data[0].title}</p>
                           </div>
                           <div class="mt_r_border"></div>
                           <div class="mt_r_text">
                               <p class="text_md">材料</p>
                               <ul class="clear">
                                  ${html}
                               </ul>
                           </div>
                           <div class="mt_r_border"></div>
                           <div class="mt_r_text">
                               <p class="text_md1">做法</p>
                               <p class="text_sm">做法：</p>
                               ${html1}
                           </div>
                       </div>
                 </div>
                   <div class="close">
                       <a href="javascript: ;"></a>
                   </div>
                  `
              // console.log(html2);
               $("#motai .colle").html(html2);
           },
           error:function(){
               alert("网络故障请检查");
           }
       });
    $("#motai").css("height","100%");
    /////////
    $("#collect").unbind();
    $("#collect").click(function(){
        var uname = sessionStorage.getItem("uname");
        var a=$(this);
        if(uname==null){
            $(".login").css("display","block");
            $("#motai").css("height","0%");
        }else if(a.attr('class')=="fenxiang1"){
                $.ajax({
                    type:'GET',
                    url:'data/collect/collect_recipe_insert.php',
                    data:{
                        lid,
                        uname
                    },
                    success:function(data){
                        if(data.msg==1){
                            $("#collect").addClass("fenxiang1_1").removeClass("fenxiang1")
                        }
                    },
                    error:function(){
                        alert('网络错误');
                    }
                })
        }else if(a.attr('class')=="fenxiang1_1"){
            $.ajax({
                type:'GET',
                url:'data/collect/collect_recipe_delete.php',
                data:{
                    lid,
                    uname
                },
                success:function(data){
                    console.log(data);
                    if(data.msg==1){
                        $("#collect").addClass("fenxiang1").removeClass("fenxiang1_1")
                    }else{
                        $("#collect").addClass("fenxiang1_1").removeClass("fenxiang1")
                    }
                },
                error:function(){
                    alert('网络错误');
                }
            })
        }

    });
}).on("mouseover","div>ul>li",function(){
    var li=$(this);
    li.children().first().children().addClass("img_scale");
}).on("mouseleave","div>ul>li",function(){
    var li=$(this);
    li.children().first().children().removeClass("img_scale");
})
/*模态*/
$("#motai").on("click",".close",function(){
    $("#motai").css("height","0%");
})
// $("#motai ").on("mouseover",'.fenxiang1',function(){
//     $(this).addClass("fenxiang1_1");
// }).on("mouseleave",'.fenxiang1',function(){
//     $(this).removeClass("fenxiang1_1");
// })
// $("#motai ").on("mouseover",'.fenxiang2',function(){
//     $(this).addClass("fenxiang2_1");
// }).on("mouseleave",'.fenxiang2',function(){
//     $(this).removeClass("fenxiang2_1");
// })
// $("#motai ").on("mouseover",'.fenxiang3',function(){
//     $(this).addClass("fenxiang3_1");
// }).on("mouseleave",'.fenxiang3',function(){
//     $(this).removeClass("fenxiang3_1");
// })

	
		$(window).scroll(()=>{
                 if($("body").scrollTop()>=parseInt($("#lunbo").css("height"))){
                     $("#tou2").addClass("fixed_nav1");}
                 else
                     $("#tou2").removeClass("fixed_nav1");
             })
