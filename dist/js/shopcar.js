function getCart(){
    if(!localStorage.cart) return 0;
    var aMsg = JSON.parse(localStorage.cart);
    return aMsg;
}

function renderCart(){
    var html = "";
    var cart_json = getCart();
    if(!cart_json) return 0;
    for(var i = 0 ; i < cart_json.length ; i ++){
          html += `
          <li class="goods-detail">
                        <div class="ct1 contype1">
                            <img src="${cart_json[i].show.img}" alt="">
                            <p> ${cart_json[i].title}</p>
                        </div>
                        <div class="ct1 contype2">${cart_json[i].price}</div>
                        <div class="ct1 contype3">
                            <p class="nq num-a"><a href="">-</a></p>
                            <p class="num-b">${cart_json[i].count}</p>
                            <p class="nq num-c"><a href="">+</a></p>
                        </div>
                        <div class="ct1 contype4">
                            <p class="kg">9.390</p>
                        </div>
                        <div class="ct1 contype5">
                            <p class="price">${cart_json[i].price}</p>
                        </div>
                        <div class="ct1 contype6">
                            <p class="save">收藏</p>
                            <p class="delete" id="${cart_json[i].iid}">删除</p>
                        </div>
                    </li>`
    }
    return html;
}
$(".goodslist").html(renderCart())



$(".goodslist").on("click",".delete",function(event){
    
    var e = event||window.event;
    var target = e.target ||e.srcElement;
    var id = target.id;
    
    var str = localStorage.cart;
    var arr = JSON.parse(str);
    
    var targetItem = arr.filter(function(item){
        return item.iid == id
    })
    var targetIndex = arr.indexOf(targetItem)
    arr.splice(targetIndex,1)
    
    var strEnd = JSON.stringify(arr); 
    localStorage.setItem("cart",strEnd)
    $(".goodslist").html(renderCart())
    
})