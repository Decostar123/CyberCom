
import {data} from "./data.js" ; 
            
document.addEventListener('DOMContentLoaded' , ()=>{
   
   let purchasedItems = localStorage.getItem("purchasedItems") ; 
if( !purchasedItems  ){
   const temp = [] ; 
   for( let i = 0 ; i < data.length ; i++ ) temp.push({})
   localStorage.setItem( "purchasedItems" , JSON.stringify(temp)) ;
   alert("hi")
    
}

purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) ; 

console.log( data ) ; 
console.log( purchasedItems ); 
for( let ind = 0 ; ind < data.length ; ind++  ){

   const ele = data[ind] ;

   purchasedItems[ind].name = ele.name ; 
   purchasedItems[ind].quantity = 0 ; 
   purchasedItems[ind].price = ele.price ;

   console.log( purchasedItems[ind])
   // purchasedItems[ind].name = ele.name;
   const div1 = document.createElement("div") ; 
   div1.id = Date.now() ; 
   purchasedItems[ind]._id = div1.id ; 
   // alert( div1.id )
   div1.classList.add("element") ; 
   
   const tempHTML = `
       <div class="item">
           <i class="${ele.imageClass}"></i>
           <pre>${ele.name}
<span class="price">₹${ele.price}</span>
       </div>
       
       `
       div1.insertAdjacentHTML('beforeend' , tempHTML  ) ; 
       const div2 = document.createElement("div") ; 
       div2.classList.add("desc") ; 
       const i1 = document.createElement("i")
       i1.classList.add("bx");
       i1.classList.add("bxs-minus-circle") ; 
       i1.style.cursor = "pointer" 
       const p1 = document.createElement("p") ; 
       p1.textContent =  purchasedItems[ind].quantity ; 
     
       const i2 = document.createElement("i")
       i2.classList.add("bx");
       i2.style.cursor = "pointer" 
       i2.classList.add("bxs-plus-circle") ;
       div2.append(i1) ; 
       div2.append(p1)  ;
       div2.append(i2);
       div1.append(div2) ;  

       document.querySelector("#body").append( div1 ) ;
       i1.addEventListener("click" , ()=>{
           decrease ( div1 , p1 ) 
       })
       i2.addEventListener("click" , ()=>{
           increase( div1 , p1 ) ; 
       })
       // document.querySelector("#body").insertAdjacentHTML("beforeend" , tempHTML ) ;
}
console.log("purchasedItems" , purchasedItems) ;
localStorage.setItem( "purchasedItems" , JSON.stringify(purchasedItems)) ;


}  ) ;



function decrease(  div1 , p1 ){
   // alert(ind ) ; 

   let purchasedItems = localStorage.getItem("purchasedItems") ; 
if( purchasedItems === null  ){
   alert("Error ocurred ") ; 
   return ; 
    
}

purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) ; 
console.log( purchasedItems ) ; 
// alert(p1.textContent )
if(p1.textContent === '0' ){
   const ans = confirm("Are you  sure you want to delete the item ?") ;
   if( !ans) return  ; 
   if( ans ){
       const index = purchasedItems.findIndex( ele => ele._id === div1.id ) ; 
       if( index === -1 ){
           alert(" Error ocurred ") ; return  ; 
       }
       // purchasedItems.splice(index , 1  ) ;
       div1.remove() ;      
       alert("Deleted Item sucessfully ") ; 
       return ; 
   }
}else{
   const index = purchasedItems.findIndex( ele => ele._id === div1.id ) ; 
   purchasedItems[index].quantity = Number(purchasedItems[index].quantity) -1 ; 
   localStorage.setItem("purchasedItems" , JSON.stringify(purchasedItems) )
   purchasedItems = JSON.parse( localStorage.getItem("purchasedItems")) ;
   p1.textContent = purchasedItems[index].quantity; 
   console.log( purchasedItems ) ; 

}


}


function increase( div1 , p1  ){
   let purchasedItems = localStorage.getItem("purchasedItems") ; 
if( purchasedItems === null  ){
   alert("Error ocurred ") ; 
   return ; 
    
}

purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) ; 
const index = purchasedItems.findIndex( ele => ele._id === div1.id ) ; 
       if( index === -1 ){
           alert(" Error ocurred ") ; return  ; 
       }
       // alert(index)
       purchasedItems[index].quantity = Number(purchasedItems[index].quantity) + 1 ; 
   localStorage.setItem("purchasedItems" , JSON.stringify(purchasedItems) )
   purchasedItems = JSON.parse( localStorage.getItem("purchasedItems")) ;
   p1.textContent = purchasedItems[index].quantity; 
   console.log( purchasedItems ) ; 

}

document.querySelector("#history").addEventListener('click' , ()=>{
   window.location.href = "history.html" ; 
})
