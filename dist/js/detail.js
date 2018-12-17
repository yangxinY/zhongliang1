// 放大镜
;$(function(){
    //选择小图改变大图
    // $(".cm-lb").on("mouseenter",".cm-small",function(){
    //     var src=$(this).find("img").attr("src");
    //     $(this).addClass("current").siblings("li").removeClass("current")
    //     $(".cm-lt img").attr("src",src);
    //     $(".bigImg img").attr("src",src);
    // })

    $(".cm-lb").on("mouseenter","li",function(){
        var src=$(this).find("img").attr("src");
        $(this).addClass("aaa").siblings("li").removeClass("aaa");
        $(this).addClass("aaa").css({
            "border":"1px solid red"
        })
        $(".cm-lt img").attr("src",src);
        $(".bigImg img").attr("src",src);
    })
    $(".cm-lb").on("mouseout","li",function(){
        $(this).addClass("aaa").siblings("li").removeClass("aaa");
        $(this).addClass("aaa").css({
            "border":"none"
        })
    })

    function Fangda(){};
    $.extend(Fangda.prototype,{
        init(){
            this.box=$(".cm-main")
            this.small=$(".cm-lt");
            this.big=$(".bigImg");
            this.frame=$(".frame");
            this.bindEvent();
        },
        bindEvent(){
            this.box.on("mouseenter",this.showPop.bind(this));
            this.box.on("mouseleave",this.hidePop.bind(this));
            this.box.on("mousemove",this.move.bind(this))
        },
        showPop(){
            this.frame.css("opacity",".3");
            this.big.css("display","block");
            this.frame.css("display","block");
        },
        hidePop(){
            // this.frame.css("opcity","0");
            this.big.css("display","none");
            this.frame.css("display","none");
        },
        move(event){
            let e=event||window.event;
            let left=e.pageX-this.box.offset().left-this.frame.width()/2;
            let top=e.pageY-this.box.offset().top-this.frame.height()/2;
            if(left<0){
                left=0;
            }else if(left>=this.small.width()-this.frame.width()){
                left=this.small.width()-this.frame.width();
            }else{
                left=left;
            }
            if(top<0){
                top=0;
            }else if(top>this.small.height()-this.frame.height()){
                top=this.small.height()-this.frame.height()
            }else{
                top=top;
            }
            this.frame.css({"left":left})
            this.frame.css({"top":top})
            var x=left*2;
            var y=top*2;
            this.big.children().css({"left":-x+"px"});
            this.big.children().css({"top":-y+"px"});
        }
    })
    new Fangda().init();
})


// // $.cookie("dataId")
// // console.log($.cookie("dataId"))

$(function(){
    function Liuqin(){};
    $.extend(Liuqin.prototype,{
        init(){
            // this.renbox=$(".con-main")
            this.goodslist=[];
            this.getData()
            .done(function(res){
                // console.log(res)
                this.goodslist=res.result.wall.list
                this.renderPage();
                this.bindEvent();
            })
            
        },
        getData(){
            var options={
                url:"https://list.mogujie.com/search",
                type:'GET',
                dataType:"jsonp",
                context:this,
            };
           return $.ajax(options)
            
        },
        renderPage(){
            // console.log(111)
            console.log(this.goodslist)
            var cid=$.cookie("dataId");
            // console.log(cid)
            var bImg="";  
            var sImg="";
            var aTitle="";
            var oPrice="";
            var nPrice="";
            var aSum="";
            var bgImg="";
            var bBtn="";
            for(var i=0;i<this.goodslist.length;i++){
                // console.log(data[i].show.img)
                // console.log(data[i].iid)
                if(this.goodslist[i].iid==cid){
                    // console.log(data[i].show.img)
                    bImg=`
                    <img src="${this.goodslist[i].show.img}" alt="">
                    `
                    sImg=`
                    <ul class="ul-lb">
                        <li class="cm-small" id="small-1">
                        <img src="${this.goodslist[i].show.img}" alt="">
                        </li>
                        <li class="cm-small" id="small-2"><img src="http://s3.mogucdn.com/mlcdn/c45406/181104_5icab847kjbea3538hk5gei54k9jj_640x960.jpg_320x999.jpg" alt=""></li></li>
                        <li class="cm-small" id="small-3"><img src="http://s3.mogucdn.com/mlcdn/c45406/181102_3j6b09gej603ba1428dc3ijh9ge19_640x960.jpg_320x999.jpg" alt=""></li>
                        <li class="cm-small" id="small-4"><img src="http://s11.mogucdn.com/mlcdn/c45406/181126_772k2ckgg29a81i2k1kclcdddc0ef_640x960.jpg_320x999.jpg" alt=""></li>  
                    </ul>
                    `
                    aTitle=`
                    <h3>${this.goodslist[i].title}</h3>                
                    <h4>${this.goodslist[i].props}</h4>
                    `
                    oPrice=`
                    <span class="com-a">原价</span> 
                    <p>${this.goodslist[i].orgPrice}</p>
                    `
                    nPrice=`
                    <span class="com-a">现价</span> 
                    <strong>${this.goodslist[i].price}</strong>
                    `
                    aSum=`
                    <ul class="num-aa">
                        <li class="s-num s-num1">
                            <p><i class="fa fa-arrow-circle-up" aria-hidden="true"></i>累计销量<span>${this.goodslist[i].sale}</span></p>
                        </li>
                        <li class="s-num s-num2">
                            <p><i class="fa fa-heart" aria-hidden="true"></i>评分<span>${this.goodslist[i].itemMarks}</span></p>
                        </li>
                        <li class="s-num s-num3">
                            <p><i class="fa fa-money" aria-hidden="true"></i>送金币<span>${this.goodslist[i].itemMarks}</span></p>
                        </li>
                    </ul>
                    `           
                    bgImg=`
                        <img src="${this.goodslist[i].show.img}" alt="">
                   
                    ` 
                    bBtn=`
                        <button data-id=${this.goodslist[i].iid} id="btn3">加入购物车</button>
                    `
                }
            }
            $(".cm-lt").html(bImg);
            $(".cm-lb").html(sImg);
            $(".t-props").html(aTitle);
            $(".orgPrice").html(oPrice);
            $(".price").html(nPrice);
            $(".sum-num").html(aSum);
            $(".bigImg").html(bgImg);
            $(".box-btn").html(bBtn);
        },
        bindEvent(){
            $(".box-con .box-btn").on("click","#btn3",this.handleCarClick.bind(this));
        },
        handleCarClick(event){
            var e=event||window.event;
            var target=e.target||e.srcElement;
            var iid=$(target).attr("data-id");
            console.log(iid);
            var nowMsg=this.findJson(iid)[0];
            this.addCar(nowMsg,iid);
            // console.log(nowMsg)
        },
        findJson(iid){
            return  this.goodslist.filter(function(item){
                return  item.iid === iid
          })
        },
        addCar(nowMsg , iid){
            // 存数据;
            // 1. 因为我们要存的数据是对象,但是localstroage可以存储的数据只有字符;
            // object => string;
            $.extend(nowMsg , {count : 1});
            var sNowMsg = JSON.stringify(nowMsg);
            // console.log(sNowMsg);
            // 2. 如果直接进行存储的话会导致购物车里只有一个数据。如果要储存多个，那么购物车里的数据应该以数组为数据类型;
            
            // 3. 还是覆盖是为什么，因为如果已经有了数据,那么这时候我们会覆盖之前的数据;
            // 先把结构取出来 查看一下是否存在，如果存在，我就向里面拼接,如果不存在我再建立结构;
      
            if(!localStorage.cart){
                  localStorage.setItem("cart",`[${sNowMsg}]`);
                  return false;
            }
            // 如果存在对结构进行插入;
      
            // aMsg 变成数组了; localStorage 字符串转换成数组的数据;
            var aMsg = JSON.parse(localStorage.cart);
      
            // 如果存在数据就不push ， 而是增加 count 值;
            if(!this.hasIid(aMsg,iid)){
                  aMsg.push(nowMsg);
            }
      
            //localStorage 重新设置；
            localStorage.setItem("cart",JSON.stringify(aMsg));
      
            // console.log(JSON.parse(localStorage.cart));
      },
      hasIid(aMsg,iid){
            for(var i = 0 ; i < aMsg.length ; i ++){
                if(aMsg[i].iid === iid){
                        aMsg[i].count ++;
                        return true;
                }
            }
            return false;
    }
    })
    new Liuqin().init()
})


$(".box-btn").on("click",function(){
    $(".box-alert").animate({
        "display":"block"
    },300)
})
// $(".box-alert").on("click",function(){
//     location.href="shopcar.html"
// })













// $(function(){
//     $(".frame").on("mouseenter",function(){
//         $(this).css({
//             "display":"block"
//         })
//     })
//     $(".frame").on("mouseleave",function(){
//         $(this).css({
//             "display":"none"
//         })
//     })
// })

