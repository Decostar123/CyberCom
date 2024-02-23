


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
   
    // alert("22222222222")
document.querySelector("#items").innerHTML = "";
// showFilteredContent() ; 
const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 

console.log( " showCOntn   " , itemsObj)
let cnt = itemsObj.count ; 
let start  =  6*(cnt-1) ; 
let end = 6*cnt -1 ; 
const  showItems = itemsObj.showItems ; 
    for( let ind =  start ; ind <= end ; ind++ ){
        if( ind >= showItems.length  ) continue ; 
        const entry = showItems[ind]

        console.log("hi")
        let boxDiv = document.createElement("div") ; 
        boxDiv.style.position = "relative"
        let imgSrc = entry.thumbnail  ; 

        // Create the image element
        let imgElement = document.createElement("img");
        
        // Set the src attribute to the original image URL or fallback image URL
        imgElement.src = imgSrc;
        
        // Set the alt attribute
        imgElement.alt = "Image Not Found";
        
        // Add an event listener to check if the image fails to load
        // imgElement.addEventListener('error', function() {
        //     // If the original image fails to load, set the src to the fallback image URL
        //     imgElement.src = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fw3-lab.com%2Fwp-content%2Fuploads%2F2022%2F09%2FFOR-WEB-404-astronaut.jpg&tbnid=5ptYKTWROrCwkM&vet=12ahUKEwiaxZOG3cCEAxXs0KACHcJRBEAQMygoegUIARC9AQ..i&imgrefurl=https%3A%2F%2Fw3-lab.com%2Fbest-ux-404-error-page-practices-examples%2F&docid=IDYzk7i1nO42_M&w=1100&h=500&q=not%20found%20404%20images&ved=2ahUKEwiaxZOG3cCEAxXs0KACHcJRBEAQMygoegUIARC9AQ";
        // });
        
        // Append the image element and other content to the boxDiv
        boxDiv.appendChild(imgElement);
        boxDiv.innerHTML += `
            <h1 class="title">${entry.title}</h1>
            <p class="description">${entry.description}</p>
            <p class="price">₹ ${entry.price}</p>
            <p class="rating">Rating ${entry.rating}</p>
            <br>
        `;

        const deleteImage = document.createElement("img") ; 
        deleteImage.id="deleteImage"
        deleteImage.src="./dustbin.png"
        boxDiv.append( deleteImage )  ;
        const editButton = document.createElement("button") ; 
        editButton.classList.add("editButton") ;
        editButton.textContent = "Edit" ; 
        editButton.addEventListener('click' , ()=> editProduct(entry.id))
        boxDiv.append( editButton )  ;

        deleteImage.addEventListener('click'  , ()=> deleteProduct(entry.id )) ; 
        
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


function deleteProduct(productID ){
    const ans = confirm("Are you sure you want to delete the Item ?") ; 
    if( !ans ) return ; 

    fetch(`https://dummyjson.com/products/${productID}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {

        const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
        itemsObj.originalItems =  itemsObj.originalItems.filter( ele => ele.id !== productID ) ; 
        localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj) ) ; 
        showFilteredContent() ; 
        alert("Item Deleted successfully ");
    }).catch(()=>{
        alert("Error ocured try again later ")
    });

}
document.querySelector("#searchText").addEventListener("input" , (e)=>{
    
    const searchValue = e.target.value ;
    // alert(searchValue) 
    document.querySelector(".loader").style.display = 'block' ; 
    document.querySelector("#black").style.display = 'block' ; 
    // const itemsObj = JSON.parse( localStorage.getItem("itemsObj")) ; 

    // itemsObj.showItems = itemsObj.originalItems.filter( ele => {
    //     const str1 = ele.title.toLowerCase() ; 
       
    //     return str1.includes(searchValue.toLowerCase())  ;
    // });

    showFilteredContent() ; 

    // localStorage.setItem( "itemsObj"  , JSON.stringify( ))
    // console.log(itemsObj.showItems  );
    // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    // showContent(  )
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









document.querySelector("#ascending").addEventListener('click' , ()=>{
    // alert("hi")
    // const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    // itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => a.price - b.price ) ; 
    // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  

    showFilteredContent() ; 
    showContent() ;
})
document.querySelector("#descending").addEventListener('click' , ()=>{
    // const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    // itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => b.price - a.price ) ; 
    // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
showFilteredContent() ; 
    // showContent() ;
   
 })


 document.querySelector("#range").addEventListener('input' , ()=>{
    showFilteredContent() ;
    // showContent()   
 })

 function showFilteredContent(){

    // alert("!11111111111111")
    const val = document.querySelector("#range").value ; 
    // alert( val ) ; 
    let ratingVal = Number(val) ; 
    // alert(ratingVal)
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    let ascending = document.querySelector("#ascending").checked ; 
    let descending = document.querySelector("#descending").checked ; 

    let searchVal = document.querySelector("#searchText").value  ;
    itemsObj.showItems = itemsObj.originalItems.filter( ele => {
        const str1 = ele.title.toLowerCase() ; 
       
        return str1.includes(searchVal.toLowerCase())  ;
    });

    console.log("showFlterd conent 1111111" ,itemsObj.showItems )
    console.log("showFlterd conent 222222" ,itemsObj.originalItems )
    // alert( searchVal);

    if( ascending ) {
        // alert("ascendinf")
        itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => a.price - b.price ) ; 
    }
    if( descending ) {
        // alert("Descending")
        itemsObj.showItems =   itemsObj.showItems.sort( ( a, b) => b.price - a.price ) ; 
    }
   
    
    
    itemsObj.showItems = itemsObj.showItems.filter( ele => ele.rating >=ratingVal ) ;
    
    console.log("showFlterd conent 1111111" ,itemsObj.showItems )
    
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ;  
    console.log("showFlterd conent 1111111" ,itemsObj.showItems )
    showContent() ; 
    // showContent() ;
 }

 document.querySelector("#addNew").addEventListener('click' , ()=>{


    // document.querySelectorAll("#black").style.display = "block" ; 
    document.querySelector("#black").style.display = 'block' ; 
    document.querySelector("#newProduct").style.display = 'flex' ; 
 })

 document.querySelector("#CANCEL").addEventListener('click' , ()=>{

    const ans = confirm("Are you sure you want to cancel adding product ?") ; 
    if( !ans ) return  ; 

    document.querySelector("#black").style.display = 'none' ;
    document.querySelector("#newProduct").style.display = 'none' ; 
 })


 document.querySelector("#newProduct").addEventListener('submit' , (e)=>{

    e.preventDefault() ; 
    const ans = confirm("Are you sure you want to Add product ?") ; 
    if( !ans ) return  ; 

    addNewProduct() ; 
    
 })


 function addNewProduct(){
    const imageLink = document.querySelector("#imageLink").value ; 
    const title = document.querySelector("#title").value ; 
    const description = document.querySelector("#description").value ; 
    const price = Number(document.querySelector("#price").value) ; 
    const rating = Number(document.querySelector("#rating").value) ;


    console.log( imageLink, title, description, price, rating   ) ; 

    fetch('https://dummyjson.com/products/add', {
     method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    thumbnail : imageLink,
    title: title,
    description : description, 
    price : price ,
    rating : rating
    /* other product data */

    })
    })
.then(res => res.json())
.then(()=>{

    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ; 
    const imageID = Date.now() ; 
    const imageObj = {  id : imageID ,title : title, description:description, price:price ,  rating:rating  , 
        thumbnail :  imageLink }

    itemsObj.originalItems.push( imageObj ) ; 
    localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 

    // showContent()  ; 
    showFilteredContent() ; 

    document.querySelector("#black").style.display = 'none' ;
    document.querySelector("#newProduct").style.display = 'none' ; 
    alert("Added new Product suceeesfully")
});
// id: 1, title: "iPhone 9", description: "An apple mobile which is nothing like apple", price: 549,…}
    // const imageLink = document.querySelector("#imageLink").value ; 


    


 }


 function editProduct( productID ){
    const ans  = confirm("Do you Want to Edit the Produc ?") ; 


   
console.log("productID is this  " , productID )


    if( !ans ) return ; 
    const productInd = getIndex( productID ) ; 

    console.log( "productInd is this  " , productInd )
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;

    document.querySelector("#black").style.display = 'block' ; 
    document.querySelector("#editProduct").style.display = 'flex' ; 


    document.querySelector("#eimageLink").value  = itemsObj.originalItems[productInd].thumbnail; 
    document.querySelector("#etitle").value = itemsObj.originalItems[productInd].title ; 
    document.querySelector("#edescription").value = itemsObj.originalItems[productInd].description; 
    document.querySelector("#eprice").value = itemsObj.originalItems[productInd].price; 
    document.querySelector("#erating").value = itemsObj.originalItems[productInd].rating ;

    document.querySelector("#editProduct").addEventListener('submit' , (e)=>{

        e.preventDefault() ; 
        const ans = confirm("Are you sure you want to save edited changes  ?") ; 
        if( !ans ) return  ; 
    
        saveEditedChanges(productID) ; 
        
     })
    
    
}


function saveEditedChanges(productID){
    // alert("1111111111")
    const productInd = getIndex(productID) ; 

    fetch(`https://dummyjson.com/products/${productID}`, {
  method: 'PUT', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    thumbnail :document.querySelector("#eimageLink").value,
    title: document.querySelector("#etitle").value   , 
    description : document.querySelector("#edescription").value  , 
    price  : document.querySelector("#eprice").value , 
    rating :  document.querySelector("#erating").value 


  })
})
.then(res => res.json())
.then( res =>{

    console.log( res )  ;
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;

    itemsObj.originalItems[productInd].thumbnail = document.querySelector("#eimageLink").value ; 
    itemsObj.originalItems[productInd].title =  document.querySelector("#etitle").value  ; 
    itemsObj.originalItems[productInd].description = document.querySelector("#edescription").value  ; 
    itemsObj.originalItems[productInd].price = document.querySelector("#eprice").value ; 
    itemsObj.originalItems[productInd].rating  = document.querySelector("#erating").value ;

        localStorage.setItem("itemsObj" , JSON.stringify(itemsObj)) ;  
        console.log("edited product  "  ,itemsObj )
        
        alert("Edited Changes Were Saved ") ; 
        
        document.querySelector("#black").style.display = 'none' ; 
        document.querySelector("#editProduct").style.display = 'none' ; 
        showFilteredContent() ; 

});
    

}
function getIndex(productID){
    const itemsObj =  JSON.parse(localStorage.getItem( "itemsObj") )  ;
    const ind = itemsObj.originalItems.findIndex( ele => ele.id === productID ) ; 
    return ind ; 
}
document.querySelector("#CANCELEDIT").addEventListener("click" , ()=>{
    // alert("ok") ; 


    const ans = confirm("Are you sure you want to cancel editing?") ; 
    if( !ans ) return  ; 

    document.querySelector("#black").style.display = 'none' ;
    document.querySelector("#editProduct").style.display = 'none' ; 
    // alert("ppppppppp")

})



 