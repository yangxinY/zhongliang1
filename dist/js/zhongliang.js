// 最顶部图片切换
setTimeout(function(){
    $("#top-pho1").hide()
},3000)
setTimeout(function(){
    $("#top-pho2").show()
},3000)
     
// 轮播图左边菜单
// $(".head p").mouseover(function(){
//     console.log(2)
//     $(this).css({
//         display:"block"
//     })
// })
 

//轮播部分最右侧鼠标滑过事件
$("#title-1").on("mouseover",function(){
    // console.log(1);
    $(".cont-a").show().siblings(".cont").hide();
    $("#title-1").css({
        'border-bottom':"2px solid green",
        background:"#fff"
    }).siblings("li").css({
        'border-bottom':"none",
        background:"#f7f7f7"
    })
})
$("#title-2").on("mouseover",function(){
    $(".cont-b").show().siblings(".cont").hide();
    $("#title-2").css({
        'border-bottom':"2px solid green",
        background:"#fff"
    }).siblings("li").css({
        'border-bottom':"none",
        background:"#f7f7f7"
    })
})
$("#title-3").on("mouseover",function(){
    $(".cont-c").show().siblings(".cont").hide();
    $("#title-3").css({
        'border-bottom':"2px solid green",
        background:"#fff"
    }).siblings("li").css({
        'border-bottom':"none",
        background:"#f7f7f7"
    })
})

//双12活动部分外包盒子的背景色
$(".sale-detail").on("mouseover",function(){
    // console.log(1);
    $(this).css({
        background: "#c30000",
            opacity: .8
    }).siblings("li").css({
        background: "#c30000",
            opacity: 1
    })
})
$(".sale-detail").on("mouseout",function(){
    $(this).css({
        background: "#c30000",
            opacity: 1
    })
})

$(".sale-left").on("mouseover",function(){
    // console.log(1);
    $(this).css({
        background: "#c30000",
            opacity: .8
    })
})
$(".sale-left").on("mouseout",function(){
    $(this).css({
        background: "#c30000",
            opacity: 1
    })
})


// 每日劲爆品
$(".zr-s img").on("mouseover",function(){
    // console.log(1)
    $(this).stop().animate({
        width:220,
        height:220,
        margin:0,
    },800)
})
$(".zr-s img").on("mouseout",function(){
    // console.log(1)
    $(this).stop().animate({
        width:180,
        height:180,
        margin:"20px 0 20px 29px"
    },800)
})
$(".swiper-container").on("mouseover",function(){
    $(".act-v").show()
})
$(".swiper-container").on("mouseout",function(){
    $(".act-v").hide()
})

//进口食品
// $(".special-a").css({
//     height:37,
//     "border-bottom":"2px solid #a1c0f6"
// })
$(".special-a").on("mouseover",function(){
    $(this).css({
        height:37,
        "border-bottom":"2px solid #a1c0f6",
    })
    $(this).parent(".or-title").siblings(".or-cont-1")
    .css({
        display:"block"
    })
    .siblings(".or-cont-2")
    .css({
        display:"none"
    })
})
$(".special-a").on("mouseout",function(){
    $(this).css({
        "border-bottom":"none",
    })
})
// $(".special-a").css({
//     height:37,
//     "border-bottom":"2px solid #a1c0f6"
// })
$(".hot").on("mouseover",function(){
    $(this).css({
        height:37,
        "border-bottom":"2px solid #a1c0f6",
    })
    $(this).parent(".or-title").siblings(".or-cont-2")
    .css({
        display:"block"
    })
    .siblings(".or-cont-1")
    .css({
        display:"none"
    })
})
$(".hot").on("mouseout",function(){
    $(this).css({
        "border-bottom":"none",
    })
})




// 左边图片遮罩层的特效
$(".of-go").on("mouseenter",function(){
    $(".frame-a").animate({
        left:400,
        display:"block",
        opacity:.5
    },500)
})
$(".of-go").on("mouseleave",function(){
    $(".frame-a").animate({
        left:-150,
        display:"none",
        opacity:0
    },0)
})

//每日劲爆品-左边图片遮罩层的特效
$(".left").on("mouseenter",function(){
    $(this).children(".frame-b").animate({
        left:400,
        display:"block",
        opacity:.5
    },500)
})
$(".left").on("mouseleave",function(){
    $(this).children(".frame-b").animate({
        left:-150,
        display:"none",
        opacity:0
    },0)
})

//控制每个图片特效
$(".of-go").on("mouseenter",function(){
    $(this).children(".frame-a").stop().animate({
        left:400,
        display:"block",
        opacity:.5
    },500)
    .end()
    .parents(".common-a").siblings(".common-a").find(".frame-a").stop();
    $(this).parents(".common-a").find(".frame-a-1").stop()
    // console.log($(this),$(this).parents(".common-a").find(".frame-a-1"))
    // console.log($(this),$(this).parents(".common-a").siblings(".common-a"))
})

$(".of-go").on("mouseleave",function(){
    $(this).children(".frame-a").stop().animate({
        left:-150,
        display:"none",
        opacity:0
    },0)
    .end()
    .parents(".common-a").siblings(".common-a").find(".frame-a").stop();
})

//全球购的cont-4
$(".of-go-1").on("mouseenter",function(){
    $(this).children("frame-a-1").stop().animate({
        left:400,
        display:"block",
        opacity:.5
    },500)
})
$(".of-go-1").on("mouseleave",function(){
    $(this).children("frame-a-1").stop().animate({
        left:-150,
        display:"none",
        opacity:0
    },0)
})


// 每日劲爆品
var swiper = new Swiper('.swiper-container', {
    autoplay:{
        delay:1500
    },
    loop: true,
    // loopFillGroupWithBlank: true,
    // autoplayDisableOnInteraction: true,
    pagination: {
    el:'.swiper-pagination',
    // clickable: true,

    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
});
swiper.el.onmouseover = function(){
    swiper.autoplay.stop();
  }
swiper.el.onmouseout = function(){
    swiper.autoplay.start();
}
//鼠标滑过pagination控制swiper切换
for(i=0;i<swiper.pagination.bullets.length;i++){
    swiper.pagination.bullets[i].index=i
    swiper.pagination.bullets[i].onmouseover=function(){
        swiper.slideTo(this.index);
    };
}


// 顶部弹出框
    //绑定滚动条事件
    $(window).on("scroll",function(){
        console.log(1)
        var sTop=$(this).scrollTop();
        if(sTop>700){
            $(".top-form").css({
                "display":"block"
            })
        }
    })
