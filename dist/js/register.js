$("#quick-reg").on("click",function(){
    var username=$("#name").val();
    var password=$("#password").val();
    // console.log(username,password)
    $.ajax({
        url:"http://localhost:8000/api/users/register",
        type:"POST",
        data:{
            username:username,
            password:password
        }
    }).then(function(res){
        if(res.status == "success"){
            location.href="http://localhost:8000/login.html"
        }else{
            console.log(res)
        }
        
    },(err)=>{
        console.log("错误",err)
    })
})

