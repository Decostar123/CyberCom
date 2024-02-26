document.querySelector("#editProduct").addEventListener('submit' , (e)=>{
    
    e.preventDefault() ; 
    // alert( " submitted ");
    saveEditedChanges()
})







 function saveEditedChanges(){
        // alert("1111111111")
        const productID = Number(document.querySelector("#erating").value ) ; 
    
        fetch(`https://api.escuelajs.co/api/v1/products/${productID}`, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        title: document.querySelector("#etitle").value   , 

      
        description  : document.querySelector("#edescription").value , 

        price : Number(document.querySelector("#erating").value)
      
      })
    })
    .then(res => res.json())
    .then( res =>{
        console.log( res )
        alert("Editedsuccessfully")
        
    }).
    catch( err =>alert("error ocuured !! try again later "))
        
    
    }

    document.querySelector("#CANCELEDIT").addEventListener( 'click' , ()=>{
        window.location.href="index.html"
    })