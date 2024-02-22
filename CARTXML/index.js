


document.addEventListener( 'DOMContentLoaded' , ()=>{
   
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(res => {
    const itemsObj = { 
        originalItems : res.products , 
        showItems  : res.products , 
        count : 1 
    }
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 
    showContent( )});
})

function showContent(   ){
    // console.log( res ) ; 
// console.log( r

document.querySelector("#items").innerHTML = "";

const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
let cnt = itemsObj.count ; 
let start  =  6*(cnt-1) ; 
let end = 6*cnt -1 ; 
const  showItems = itemsObj.showItems ; 
    for( let ind =  start ; ind <= end ; ind++ ){
        if( ind >= showItems.length  ) continue ; 
        const entry = showItems[ind]

        console.log("hi")
        let boxDiv = document.createElement("div") ; 
        boxDiv.innerHTML = `
        <img src=${entry.thumbnail}>
        <h1 class="title">${entry.title}</h1>
        <p class="description">${entry.description}</p>
        <p class="price"> ₹ ${entry.price} </p>
        <p class="rating"> Rating ${entry.rating} </p>
    </div>       
    `;
    boxDiv.classList.add("box");



        document.querySelector("#items").append(boxDiv)
    }
//     <div id="page">
//     <div id="innerPage">
//         <i id="prevPage" class='bx bx-chevron-left-circle' ></i>
//         <i  id="nextPage" class='bx bx-chevron-right-circle' ></i>
//     </div>
    

// </div>
////////////////////////////////////////////////////
let divPage = document.createElement("div") ; 
divPage.id = "page" ;
let divInner = document.createElement("div") ;  
divInner.id = "innerPage"

divPage.append(divInner) ; 
let i1 = document.createElement("i") ; 
i1.id = "prevPage"
i1.classList.add("bx" , "bx-chevron-left-circle") ; 

let i2 = document.createElement("i") ; 
i2.classList.add("bx" , "bx-chevron-right-circle") ; 
i2.id = "nextPage" ; 
divInner.append(i1) ; 
divInner.append(i2) ; 

i1.addEventListener('click' , ()=> prevPage()) 
i2.addEventListener('click' , ()=> nextPage()) 


    document.querySelector("#items").append(divPage)

    ///////////////////////////////////////////////////
    document.querySelector(".loader").style.display = 'none' ; 
    document.querySelector("#black").style.display = 'none' ; 

}
document.querySelector("#searchText").addEventListener("input" , (e)=>{
    
    const searchValue = e.target.value ;
    // alert(searchValue) 
    document.querySelector(".loader").style.display = 'block' ; 
    document.querySelector("#black").style.display = 'block' ; 
    const itemsObj = JSON.parse( localStorage.getItem("itemsObj")) ; 

    itemsObj.showItems = itemsObj.originalItems.filter( ele => {
        const str1 = ele.title.toLowerCase() ; 
       
        return str1.includes(searchValue.toLowerCase())  ;
    });

    // localStorage.setItem( "itemsObj"  , JSON.stringify( ))
    console.log(itemsObj.showItems  );
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    showContent(  )
})



function nextPage(){
    document.querySelector(".loader").style.display = 'block' ; 
    document.querySelector("#black").style.display = 'block' ; 
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
    let cnt = itemsObj.count ;

    
    
    const  showItems = itemsObj.showItems ;  
    console.log( cnt   ) ; 
    console.log( showItems.length ) 
    if( cnt*6 < showItems.length  ){
        cnt++ ; 
    }

    itemsObj.count = cnt ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    showContent() ; 
 
}

function prevPage(){
    document.querySelector(".loader").style.display = 'block' ; 
    document.querySelector("#black").style.display = 'block' ; 
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
    let cnt = itemsObj.count ;

    
    
    const  showItems = itemsObj.showItems ;  
    console.log( cnt   ) ; 
    console.log( showItems.length ) 
    if( cnt > 1  ){
        cnt-- ; 
    }

    itemsObj.count = cnt ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    showContent() ; 

}
document.querySelector("#nextPage").addEventListener("click" , ()=>{
    // alert("hi"); 
     document.querySelector(".loader").style.display = 'block' ; 
    document.querySelector("#black").style.display = 'block' ; 
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
    let cnt = itemsObj.count ;

    
    
    const  showItems = itemsObj.showItems ;  
    console.log( cnt   ) ; 
    console.log( showItems.length ) 
    if( cnt*6 < showItems.length  ){
        cnt++ ; 
    }

    itemsObj.count = cnt ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    showContent() ; 

})




document.querySelector("#prevPage").addEventListener("click" , ()=>{
    // alert("hi"); 
     document.querySelector(".loader").style.display = 'block' ; 
    document.querySelector("#black").style.display = 'block' ; 
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
    let cnt = itemsObj.count ;

    
    
    const  showItems = itemsObj.showItems ;  
    console.log( cnt   ) ; 
    console.log( showItems.length ) 
    if( cnt > 1  ){
        cnt-- ; 
    }

    itemsObj.count = cnt ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    showContent() ; 

})





document.querySelector("#ascending").addEventListener('click' , ()=>{
    // alert("hi")
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => a.price - b.price ) ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  

    showContent() ;
})
document.querySelector("#descending").addEventListener('click' , ()=>{
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => b.price - a.price ) ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  

    showContent() ;
   
 })


 document.querySelector("#range").addEventListener('input' , ()=>{
    const val = document.querySelector("#range").value ; 
    let ratingVal = Number(val) ; 
    // alert(ratingVal)
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    let ascending = document.querySelector("#ascending").checked ; 
    let descending = document.querySelector("#descending").checked ; 

    let searchVal = document.querySelector("#searchText").value 
    // alert( searchVal);

    if( ascending ) {
        itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => a.price - b.price ) ; 
    }
    if( descending ) {
        itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => b.price - a.price ) ; 
    }
    itemsObj.showItems = itemsObj.originalItems.filter( ele => {
        const str1 = ele.title.toLowerCase() ; 
       
        return str1.includes(searchVal.toLowerCase())  ;
    });
    
    
    itemsObj.showItems = itemsObj.showItems.filter( ele => ele.rating >=ratingVal ) ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    showContent() ;
 })