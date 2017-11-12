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
                if (!li.children().first().hasClass("hd1_21")) {
                    li.children().first().addClass("hd1_21");
                    li.siblings().children().removeClass("hd1_21");
                }
                var left = parseInt(li.children().first().css("width"));
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