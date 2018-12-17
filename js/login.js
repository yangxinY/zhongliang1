$("#quick-reg").on("click",function(){
    location.href="register.html"
})




$("#quick-login").on("click",function(){
    var username=$("#email").val();
    var password=$("#password").val();
    var opt = {
        url:"http://localhost:8000/api/users/login",
        type:"POST",
        data:{
            username:username,
            password:password
        }
    }
    $.ajax(opt)
    .then((res)=>{
        if(res.status == "success"){
            location.href="index.html"
        }else{
            console.log(res)
        }
        // console.log(res)
    },(err)=>{
        console.log("错误",err)
    })
})