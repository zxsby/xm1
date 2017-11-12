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
    var kw=location.search.slice(4);
	$("#zhuti").on("mouseover","div>ul>li",function(){
    var li=$(this);
    li.children().first().children().addClass("img_scale");
	}).on("mouseleave","div>ul>li",function(){
		var li=$(this);
		li.children().first().children().removeClass("img_scale");
	})
    function search1(pno,kw){
        $.ajax({
            type:'GET',
            url:'data/search1.php',
            data:{
                pno,
                kw
            },
            success:function(data){
            var html = `<div class="clear">
           <p>找到相关结果${data.recodeCount}个</p>
                 <ul>`;
            for (i of data.data) {
                html += `
                    <li >
                      <a href="product.html?lid=${i.lid}">
                          <img src="${i.sm}">
                      </a>
                      <a href="product.html?lid=${i.lid}">${i.spec}</a>
                   </li>`
            }
            html += `</ul></div>`;
            $("#zhuti").html(html);
            // console.log(html);
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
         }
        })
    }
    search1(1,kw);
    $("#paging>ul").on("click","li a",e=>{
        e.preventDefault();
        var a=$(e.target);
        var n=parseInt($("#paging>ul>li>a.active").html());
        if(a.parent().is(":first-child")){
            if(n>1)
                search1(n-1,kw);
        }
        else if(a.parent().is(":last-child")){
            if(n<+a.attr('href'))
                search1(n+1,kw);
        }else search1(a.html(),kw);
    });
    // $('#tou2 li>div>a').click(function(e){
    //     e.preventDefault();
    //     var a=$(this);
    //     str=a.html();
    //     recipe(1,kw);
    // })
    // $('#all').click(function(){
    //     str=this.innerHTML;
    //     recipe(1,kw);
    // })
})();