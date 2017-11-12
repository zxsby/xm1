/**
 * Created by web-01 on 2017/10/12.
 */
$(".chanpin").click(function(){
    var a=$(this);
    sessionStorage.setItem("num",a.data("num"));
})
$(".zx").click(function(){
    var a=$(this);
    sessionStorage.setItem("zx",a.data("zx"));
})

$(".brand").click(function(){
    var a=$(this);
    sessionStorage.setItem("num1",a.data("num1"));
})












// $("#chanpin").on("click","a",function(){
//     var a=$(this);
//     sessionStorage.setItem("num",a.data("num"));
// })
// $("#zixun").on("click","a",function(){
//     var a=$(this);
//     sessionStorage.setItem("zx",a.data("zx"));
// })