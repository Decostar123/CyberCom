
const adminName1="Deco1" ;
const adminName2="Deco2";
const adminName3="Deco3" ; 

document.querySelector("form").addEventListener( 'submit' , (e) =>{
 alert( "form submitted") ; 
 e.preventDefault() ; 
 
 const formData = new FormData( e.target ) ; 
 const entry = {} ; 
 for( entries of formData ){
    const a = entries[0] ; 
    const b = entries[1] ; 
    entry[a]  = b ;

 }
 console.log( entry ) ; 
 const isChecked = document.querySelector("#condition").checked ; 

 if( !(entry.userName === adminName1 || entry.userName === adminName2 
 || entry.userName === adminName3) ) {
    alert("Only Admin can register the app" )
    return ; 
 }

 if( localStorage.adminDetails ) {
    alert("One Admin ALready registered ") ; 
    return ;    
 }
  

 localStorage.setItem( "adminDetails"  , JSON.stringify(entry)) ;
//  window.open("http://127.0.0.1:5500/Task/Dashbord.html" , "_blank");
 window.location.href="Login.html"

})

