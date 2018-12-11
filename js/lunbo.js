//核心；
        //要显示谁；
        //1.要显示的图片下标；
        //2.要隐藏的图片下标；
        var index=0;
        var prve_index=0;
        var $slides=$(".slide");
        var maxIndex=$slides.length-1;
        //
        var $pagewarp=$(".pagination");
        //什么是轮播图 就是控制index 自增自减 及范围的一个小特效
        $(".right").on("click",next);
        $(".left").on("click",prve);
        //切换下一张图片；
        function next(){
            prve_index=index;
            if(index==maxIndex){
                // alert("1");
                index=0;                
            }else{
                index++;
            }
            changeClass();
        }
        function prve(){ 
            prve_index=index; 
            if(index==0){
                index=maxIndex;
            }else{
                index--;                 
            }
            changeClass();
        }
        //当我们在切换图片的时候，只不过是在操作index;
        function changeClass(){
            $slides.eq(prve_index).addClass("slide-hide")
            .siblings(".slide")
            .removeClass("slide-hide")
            $slides.eq(index).addClass("slide-show")
            .siblings(".slide")
            .removeClass("slide-show")
            //动画效果：
            .end()
            //给上一张图片加上class willhide;
            .hide()
            .fadeIn();
            //更改按钮；
            $pagewarp.children().eq(index).addClass("active")
            .siblings("span").removeClass("active");

        }

        function initPagination(){
            //创建$slides数量的按钮；
            for(var i=0;i<$slides.length;i++){
                var $span=$("<span>");
                if(i==index){
                    $span.addClass("active");
                }
                $pagewarp.append($span);
            }
        }
        initPagination();
        //事件委托=>委托给小按钮的父级；
        $pagewarp.on("mouseover","span",toIndex)
        function toIndex(event){
            //获取元素的下标，获取事件源
            //获取事件源，获取当前发生的事件的元素；
            var e=event||window.event;
            var target=e.target||e.srcElement;
            //jquery提供了一种方法index()方法；
            //在一组元素之中，查找到某个元素的下标；
            prve_index=index;
            index=$pagewarp.children().index(target);
            // console.log(index);
            changeClass();
        }

        //自动播放，就是让js点按钮right
        var banner_timer=setInterval('$(".right").trigger("click")',1500)

        //提升用户体验 完善(鼠标移入的时候图片静止)
        $(".container").hover(function(){
            clearInterval(banner_timer);
        },function(){
            banner_timer=setInterval('$(".right").trigger("click")',1500)
        })