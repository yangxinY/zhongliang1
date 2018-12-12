//通用的工具
//通用的函数封装
function _(selector){
    var ele=document.querySelectorAll(selector);
    if(ele==0) return null;
    return ele.length == 1 ? ele[0] : ele;
}

function _ajax(url){
    return new function(resolve,reject){
        var xhr=new XMLHttpRequest();
        xhr.open("GET","url");
        xhr.send();
        xhr.onload=function(){
            if(xhr.status==200){
                return xhr.response;
            }
        }
    }
}

function _jsonp(url,cb){
    return new Promise(function(resolve,reject){
        cb = cb ? cb : "callback";
        var randomName="cb"+Date.now();
        var script=document.createElement("script");
        url += (/\?/.test(url) ? "&" : "?") + `${cb}=${randomName}`;
        script.src=url;
        document.body.appendChild(script);
        script.onload=function(){
            this.remove();
        }
        window[randomName]=function(res){
            resolve(res);
        }
    })
}
//伪数组转换为真数组
function _slice(args){
    return Array.prototype.slice.call(args);
}

// console.log(_);
// console.log(_ajax);
// console.log(_jsonp);

/** 
 * 
 * 1. 渲染页面;
 * 1.1 发送ajax : jsonp 请求
 * 1.2 拼接字符串渲染页面;
 * 2. 无限加载;
 * 
 * */ 

 //选择元素；
 var content=_(".goods-list");
 //发送ajax：jsonp请求
 var GLOBAL={
     //可视区的高度
    ch:document.documentElement.clientHeight,
    //是否在加载过程之中；
     loading_flag:false
 }

_jsonp("https://list.mogujie.com/search")
.then(function(res){
    // console.log(res);
    // console.log(res.result.wall.list);
    var goodsJSON=res.result.wall.list;
    randomPage(goodsJSON);
    //是不是有了所有的dom结构？
    // console.log(content.children);
    eleSort(content.children);
})

//渲染页面函数；
function randomPage(json){
    var html='';
    //根据比例计算图片高度
    json.forEach(function(ele){       
        // console.log(ele);
        html+=`
            <div class="goods-detail">
                <div class="good-image">
                    <img src="${ele.show.img}" width=${ 262 } height=${ parseInt(262 / ele.show.w * ele.show.h)} alt="">
                </div>           
                <div class="good-title">
                    <p>${ele.title}</p>
                </div>
                <div class="good-line"></div>
                <div class="good-box">
                    <div class="good-price">
                        <span>${ele.price}</span>
                    </div>
                    <div class="good-inform">
                        <i>★${ele.itemMarks.split(" ")[0]}</i>
                    </div>
                </div> 
                <button id="btn">加入购物车</button>          
            </div>
        `
    });   
    content.innerHTML = html;    
    return html;
}

//等宽不等高的布局如何处理？
//不用浮动布局；

function eleSort(eles){
    // console.log(eles);
    //以第一排为基准，排列后面所有的元素；
    //1.找到第一排的所有元素；
    //1.1伪数组转真数组；
    //2.排列第二排的所有元素；
    //2.1建立标准；

    //eles=>HTMLcollection;不是数组；所以没有Array的方法；
    // console.log(Array.prototype.slice.call(eles));
    //兼容型写法 Array.prototype.slice.call(args)把args转换成真数组的方法；===Array.from(args)
    //标准数组；
    var eleArray=[];
    eles=_slice(eles);
    eles.forEach(function(ele,index){
        // console.log(ele);
        //下标截止到3是第一排
        //其余的就是第二排
        if(index<=3){
            // 2.1建立标准；
            // console.log(ele,"第一排");
            eleArray.push(ele.offsetHeight);
            // console.log(eleArray);         
        }else{
            //console.log(ele,"第二排")；
            //排列第二排的东西；
            //取最小值；
            var min=Math.min.apply(false,eleArray);
            // console.log(min)
            //设置定位
            //设置top;=>数组之中的最小值;
            ele.style.position="absolute";
            ele.style.top=min+20+"px";
            //设置left值;=>最小值得下标;
            var minIndex=eleArray.indexOf(min);
            ele.style.left=eles[minIndex].offsetLeft-20+"px";
            //最后改变标准数组;
            eleArray[minIndex]+=ele.offsetHeight+20;
        }
        
    })
    // console.log(eleArray);
    GLOBAL.eleArray=eleArray;
}
//无限加载；
//到一定的时候就加载；
//什么时候加载？
//1.定一个标准；
//scrollTop(卷动的高度)+clientHeight(可视区高度)>=Math.min.apply(heightArray)最小top值;
//判定可加载;

onscroll=function(){
    // console.log("页面滚动");
    // isLoad();
    // console.log(isLoad());
    //如果需要加载，发起ajax请求；
    if(!isLoad()||GLOBAL.loading_flag) return false;
    //开始加载数据;
    GLOBAL.loading_flag=true;
    // setTimeout(function(){
    //     console.log("这是一个ajax请求 , 请求成功时的回调函数");
    //     GLOBAL.loading_flag=false;
    // },1000)
    _jsonp("https://list.mogujie.com/search")
    .then(function(res){
        GLOBAL.loading_flag=false;
        var goodsJSON=res.result.wall.list;
        randomPage(goodsJSON);
        eleSort(content.children);
    })
}

function isLoad(){
    //如果参数不存在，就不用执行；
    if(GLOBAL.eleArray==undefined) return false;
    var sh=document.documentElement.scrollHeight;
    // var ch=document.body.clientHeight||document.documentElement.clientHeight;
    var mh=Math.min.apply(false,GLOBAL.eleArray);
    // console.log(sh,mh,GLOBAL.ch)
    if(sh+GLOBAL.ch>=mh) return true;
    return false;
}