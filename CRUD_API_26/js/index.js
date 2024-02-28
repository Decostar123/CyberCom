



document.addEventListener( 'DOMContentLoaded' , ()=>{
    sessionStorage.setItem("currentPage" , 1 ) ; 
    sessionStorage.setItem("totalPages" , 0 ) ; 

    applyAllFilters() ; 


    
    }
    
    ) ; 

    function getAllProducts(){

        const currentPage = Number( sessionStorage.getItem("currentPage") ) ; 

        fetch(`https://api.escuelajs.co/api/v1/products/`)
    .then(res => res.json())
    .then(res => {
        // const itemsObj = { 
        //     originalItems : res.products , 
        //     showItems  : res.products , 
        //     count : 1 
        // }
        // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 
        showContent( res )
    }
    ).catch( err => { console.log( err) ; alert("Please try again later ")})
    
    }

    

    function showContent(   itemsObj  ){
        // alert(itemsObj.length ) ; 
        console.log( itemsObj ) ; 
        sessionStorage.setItem("totalPge" , itemsObj.length )  ; 
        // alert("hi")
        document.querySelector("#items").innerHTML = "";
        // console.log( itemsObj ) 


        // for( let ind =  start ; ind <= end ; ind++ ){

        // }
        for( let entry of itemsObj ){

            let boxDiv = document.createElement("div") ; 
            boxDiv.style.position = "relative"
            let imgSrc = entry.images[0]  ; 
    
            // console.log( imgSrc )
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
                <h4 class="title">${entry.title}</h4>
              
                <p class="description">${entry.description}</p>
                <p class="price">₹ ${entry.price}</p>
                
                <p class="rating">ProductID ${entry.id}</p>
                <br>
            `;
    
            const deleteImage = document.createElement("img") ; 
            deleteImage.id="deleteImage"
            deleteImage.src="../dustbin.png"
            boxDiv.append( deleteImage )  ;
            boxDiv.classList.add("box");

            deleteImage.addEventListener('click' , ()=>{ deleteProduct(entry.id)})

            document.querySelector("#items").append(boxDiv)
           
        }


        
        
            let divPage = pagination() ; 
        
            document.querySelector("#items").append(divPage)

        document.querySelector(".loader").style.display = 'none' ; 
        document.querySelector("#black").style.display = 'none' ; 

    }

    function pagination(){

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


        return divPage ; 



    }

    function prevPage(){
        let currentPage = Number( sessionStorage.getItem("currentPage") ) ;  
        currentPage = currentPage ===1 ? currentPage : currentPage - 1 ; 

        sessionStorage.setItem("currentPage" , currentPage )  ; 
        applyAllFilters() ; 

    }
    function nextPage(){
        let currentPage = Number( sessionStorage.getItem("currentPage") ) ;
        let totalPages = Number( sessionStorage.getItem("totalPages") ) ;



        
        
        if( currentPage*6 < totalPages ){
            currentPage+=1;
        }


        sessionStorage.setItem("currentPage" , currentPage )  ; 
        applyAllFilters() ; 

    }


    function deleteProduct(bookID){
        const ans = confirm("Are you syre you want to delte the product?") ; 
        if( !ans ) return ; 

        fetch(`https://api.escuelajs.co/api/v1/products/${bookID}` , 
        {
            method : "DELETE"
        })
        .then( res => res.json())
        .then( res=>{ alert("Deleted  Successfully") ; ; 
        applyAllFilters() ; 

    })
        .catch( ()=> StylePropertyMap("Some error ocured. Try again later"))
    }

    document.querySelector("#addNew").addEventListener('click' , ()=>{
    
        window.location.href = "addNew.html"
    
        //     // document.querySelectorAll("#black").style.display = "block" ; 
        //     document.querySelector("#black").style.display = 'block' ; 
        //     document.querySelector("#newProduct").style.display = 'flex' ; 
        //  })
    }) 

    document.querySelector("#searchText").addEventListener('input' , (e)=>{
        // alert(e.target.value) ; 
        applyAllFilters() ; 
        // const searchVal = e.target.value
        // fetch(`https://api.escuelajs.co/api/v1/products/?title=${searchVal}`)
        // .then( res => res.json())
        // .then( res => showContent( res ))
        // .catch( err => {
        //     alert("Error ocurre . PLese try again later ") ; 
        //     return ;
        // })
    })

    document.querySelector(" #descriptionSearch").addEventListener('input' , (e)=>{
        // alert(e.target.value) ;
        applyAllFilters() ;  
        // const searchVal = e.target.value
        // alert(searchVal )
        // fetch(`https://api.escuelajs.co/api/v1/products/`)
        // .then( res => res.json())
        // .then( res => res.filter( ele => ele.description.toLowerCase().includes( searchVal.toLowerCase()))  )
        // .then( res => showContent(res))
        // .catch( err => {
        //     alert("Error ocurre . PLese try again later ") ; 
        //     return ;
        // })
    })


    // document.querySelector("#searchImage").addEventListener('click' , ()=>{
    //     const searchVal = document.querySelector("#searchText").value ; 
    //     // alert( searchVal) ; 

    //     fetch(`https://api.escuelajs.co/api/v1/products/?title=${searchVal}`)
    //     .then( res => res.json())
    //     .then( res => showContent( res ))
    //     .catch( err => alert("Error ocurre . PLese try again later "))
    // })
    

    document.querySelector("#editProductID").addEventListener('click' , ()=>{
        window.location.href = "editBook.html"
    }) 
    

    
    document.querySelector("#ascending").addEventListener('change' , (e)=>{
        applyAllFilters() ; 
        // fetch('https://api.escuelajs.co/api/v1/products')
        // .then(res => res.json())
        // .then(res => {
        //     // const itemsObj = { 
        //     //     originalItems : res.products , 
        //     //     showItems  : res.products , 
        //     //     count : 1 
        //     // }
        //     // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 

        //     res.sort( ( a , b ) => a.price - b.price ) ; 
        //     showContent( res ) ; 

        // } 
        // ).catch( err => alert( " error ocurred "))
    })



        
    document.querySelector("#descending").addEventListener('change' , (e)=>{
        applyAllFilters() ; 
        // fetch('https://api.escuelajs.co/api/v1/products')
        // .then(res => res.json())
        // .then(res => {
        //     // const itemsObj = { 
        //     //     originalItems : res.products , 
        //     //     showItems  : res.products , 
        //     //     count : 1 
        //     // }
        //     // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 

        //     res.sort( ( a , b ) => b.price - a.price ) ; 
        //     showContent( res ) ; 

        // } 
        // ).catch( err => alert( " error ocurred "))
    })


     
    document.querySelector("#nameAscending").addEventListener('change' , (e)=>{
        applyAllFilters() ; 
        // fetch('https://api.escuelajs.co/api/v1/products')
        // .then(res => res.json())
        // .then(res => {
        //     // const itemsObj = { 
        //     //     originalItems : res.products , 
        //     //     showItems  : res.products , 
        //     //     count : 1 
        //     // }
        //     // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 

        //     res.sort( ( a , b ) =>  { if( a.title <= b.title ) return -1 ;  return 1 }) ; 
        //     showContent( res ) ; 

        // } 
        // ).catch( err => alert( " error ocurred "))
    })



        
    document.querySelector("#nameDescending").addEventListener('change' , (e)=>{
        applyAllFilters() ; 

        // fetch('https://api.escuelajs.co/api/v1/products')
        // .then(res => res.json())
        // .then(res => {
        //     // const itemsObj = { 
        //     //     originalItems : res.products , 
        //     //     showItems  : res.products , 
        //     //     count : 1 
        //     // }
        //     // localStorage.setItem( "itemsObj" , JSON.stringify(itemsObj)) ; 

        //     res.sort( ( a , b ) =>  { if( a.title <= b.title ) return 1 ;  return -1 }) ; 
        //     showContent( res ) ; 

        // } 
        // ).catch( err => alert( " error ocurred "))
    })


    async function applyAllFilters(){

        const searchVal =  document.querySelector("#searchText").value ; 

        let  productArr = await  fetch(`https://api.escuelajs.co/api/v1/products/?title=${searchVal}`)


        productArr = await productArr.json() ; 

        const descriptionVal =   document.querySelector(" #descriptionSearch").value ; 


        // alert(descriptionVal) ; 
        
        

        productArr = productArr.filter( (ele)=> ele.description.toLowerCase().includes( descriptionVal.toLowerCase()) ) ; 

        // console.log( "productArr is ths " , productArr) ;

        if( document.querySelector("#ascending").checked ){
            productArr.sort( ( a , b ) => a.price - b.price ) ;
        }

        if( document.querySelector("#descending").checked ){
            productArr.sort( ( a , b ) => a.price - b.price ) ;
        }

        if( document.querySelector("#nameAscending").checked ){
            productArr.sort( ( a , b ) =>  { if( a.title <= b.title ) return -1 ;  return 1 }) ; 
        }

        if( document.querySelector("#nameDescending").checked ){
            productArr.sort( ( a , b ) =>  { if( a.title <= b.title ) return 1 ;  return -1 }) ; 
        }
        sessionStorage.setItem("totalPages" , productArr.length ) ;


        const currentPage = Number( sessionStorage.getItem("currentPage") ) ;  


        productArr = productArr.filter( ( ele , ind )=>  {
            const left = (currentPage-1) *6 ; 
            const right = currentPage*6 -1 ; 
            return ind >=left && ind <= right 
        }  )

        
        showContent(productArr) ; 

        
        


    }