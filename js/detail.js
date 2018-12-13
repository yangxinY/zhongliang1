// 放大镜
;$(function(){
    //选择小图改变大图；
    // $("cm-lb").on("mouseenter","cm-small",function(){
    //     var src=$(this).find("img").attr("src");
    //     $(this).addClass("current").siblings("li").removeClass("current")

    // })

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
        },
        hidePop(){
            this.frame.css("opcity","0");
            this.big.css("display","none");
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

// ;$(function(){
//     function Liuqin(){};
//     $.extend(Liuqin.prototype,{
//         init(){
//             this.renbox=$(".con-main")
//             this.getData();
//             this.bindEvent();
//         },
//         getData(){
//             var options={
//                 url:"https://list.mogujie.com/search",
//                 type:'GET',
//                 dataType:"json"
//             };
//             $ajax(options)
//             .then(function(res){
//                 this.goodslist=res;
//                 this.renderPage(res);
//             }.bind(this))
//         },
//         renderPage(data){
//             var cid=$.cookie("dataId");
//             var bImg="";  
//             var sImg="";
//             var aTitle="";
//             var oPrice="";
//             var nPrice="";
//             var aSum="";
//             for(var i=0;i<data.length;i++){
//                 if(data[i].cid===cid){
//                     bImg=`
//                     <img src="${ele.show.img}" alt="">
//                     `
//                     sImg=`
//                     <ul>
//                         <li class="cm-small" id="small-1"><img src="${ele.show.img}" alt=""></li>
                            //  <li class="cm-small" id="small-2"><img src="http://s3.mogucdn.com/mlcdn/c45406/181104_5icab847kjbea3538hk5gei54k9jj_640x960.jpg_320x999.jpg" alt=""></li></li>
                            //  <li class="cm-small" id="small-3"><img src="http://s3.mogucdn.com/mlcdn/c45406/181102_3j6b09gej603ba1428dc3ijh9ge19_640x960.jpg_320x999.jpg" alt=""></li>
                            // <li class="cm-small" id="small-4"><img src="http://s11.mogucdn.com/mlcdn/c45406/181126_772k2ckgg29a81i2k1kclcdddc0ef_640x960.jpg_320x999.jpg" alt=""></li>  
//                     </ul>
//                     `
//                     aTitle=`
//                     <h3>${ele.title}</h3>                
//                     <h4>${ele.props.split(",")[0]}</h4>
//                     `
//                     oPrice=`
//                     <span class="com-a">原价</span> 
//                     <p>￥${ele.orgPrice}</p>
//                     `
//                     nPrice=`
//                     <span class="com-a">现价</span> 
//                     <strong>￥${ele.price}</strong>
//                     `
//                     aSum=`
//                     <ul class="num-aa">
//                         <li class="s-num s-num1">
//                             <p><i class="fa fa-arrow-circle-up" aria-hidden="true"></i>累计销量<span>${ele.sale}</span></p>
//                         </li>
//                         <li class="s-num s-num2">
//                             <p><i class="fa fa-heart" aria-hidden="true"></i>评分<span>${ele.itemMarks.split("")[0]}</span></p>
//                         </li>
//                         <li class="s-num s-num3">
//                             <p><i class="fa fa-money" aria-hidden="true"></i>送金币<span>${ele.itemMarks.split("")[2]}</span></p>
//                         </li>
//                     </ul>
//                     `                   
//                 }
//             }
//             $(".cm-lt").html(bImg);
//             $(".cm-lb").html(sImg);
//             $(".t-props").html(aTitle);
//             $(".orgPrice").html(oPrice);
//             $(".price").html(nPrice);
//             $(".sum-num").html(aSum);
//         },
//         bindEvent(){

//         }
//     })
// })