
document.addEventListener('DOMContentLoaded' , ()=>{
    const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const temp = new Date() ; 
    const date = temp.getDate() ; 
    const month = monthArr[temp.getMonth()];
    const year  = temp.getFullYear() ; 
    document.querySelector("#dates").textContent = `${month} ${date}, ${year}`


    let purchasedItems = localStorage.getItem("purchasedItems") ; 
if( purchasedItems === null  ){
    const temp = [] ; 
    for( let i = 0 ; i < data.length ; i++ ) temp.push({})
    localStorage.setItem( "purchasedItems" , JSON.stringify(temp)) ;
     
}

purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) ; 
console.log(purchasedItems)   ;  
let totalPrice = 0 ;  
for( let ind = 0 ; ind < purchasedItems.length ; ind++  ){

    const ele = purchasedItems[ind] ;
    const elementHTML = `<div class="div3">
                            <p class="itemName">${ele.name}</p>
                            <p class="itemQuantity">${ele.quantity} pcs</p>
                            <p class="total">₹${Number(ele.quantity) * Number(ele.price)}</p>
                        </div3>`
  
    document.querySelector(".div2").insertAdjacentHTML('beforeend' , elementHTML ) ; 
    // console.log( Number(ele.quantity) , Number(ele.price) )
    totalPrice += Number(ele.quantity) * Number(ele.price) ; 
}
// alert(totalPrice)
document.querySelector("#total").textContent = "Total ₹ " + totalPrice;
} ) ; 

document.querySelector("#order").addEventListener('click' , ()=>{
    window.location.href = "index.html" ; 
})
;  
