document.querySelector("#newProduct").addEventListener( 'submit' , (e)=>{

    e.preventDefault() ; 

    addNewProduct() ; 

})

   function addNewProduct(){
        const imageLink = document.querySelector("#imageLink").value ; 
        const title = document.querySelector("#title").value ; 
        const description = document.querySelector("#description").value ; 
        const price = Number(document.querySelector("#price").value) ; 
        const category = Number(document.querySelector("#rating").value) ;
    
    
        // const imageArr = [ new URL(imageLink) ]
        console.log( imageLink, title, description, price, category   ) ; 
    
        fetch(' https://api.escuelajs.co/api/v1/products/', {
         method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
       
        title: title,
        description : description, 
        price : price ,
        categoryId : category,
        images : [imageLink ]
        /* other product data */
    
        })
        })
    .then(res => res.json())
    .then((res)=>{
    
        console.log( "after adding the respnse the bok ig ot is this " , res ) ; 
        alert("Product added successfully ")
    }).catch( err => alert("Error ocured please try again later "))
    // id: 1, title: "iPhone 9", description: "An apple mobile which is nothing like apple", price: 549,…}
        // const imageLink = document.querySelector("#imageLink").value ; 
    
    
        
    
    
     }

     
    document.querySelector("#CANCEL").addEventListener("click" , ()=>{
        window.location.href = "index.html"
    })