
document.querySelector("form").addEventListener('submit' , (e)=>{
   
    e.preventDefault() ; 

    const formData = new FormData( e.target ) ; 
    const entry = {} ; 
      for( entries of formData ){
        const a = entries[0] ; 
        const b = entries[1] ; 
        entry[a]  = b ;

    }
console.log( entry ) ; 
console.log( formData ) ;
let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ; 
if( !appointmentObj){
    const obj  = { "doctor" : [] , "patient" :  [] , "meetings" :[] } ; 
    localStorage.setItem("appointment" , JSON.stringify(obj)) ; 
}
appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ; 

    if( duplicateUser(appointmentObj, entry )){
        alert("User already Registered ") ; 
        return ; 
    }
    if(  !validatePassword(entry.password )) {
        return
    }
console.log(  appointmentObj) ; 
const tempID = Date.now() ; 
entry._id = tempID ;
appointmentObj.doctor.push( entry ) ;
localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ;
// const obj= { "doctor":[] , } 
// sessionStorage.setItem()
alert( "form submitted") ; 
window.location.href="login.html" ; 

})

function duplicateUser(appointmentObj, entry ){
    let doctorIndex = appointmentObj.doctor.findIndex( ( ele ) => ele.email === entry.email ) ; 
    return  ( doctorIndex  !==  -1 ) ; 
}





function validatePassword(password) {
    // Define your validation criteria
    var minLength = 4; // Minimum length of the password

    // Regular expressions for additional validation
    var containsUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
    var containsLowerCase = /[a-z]/.test(password); // At least one lowercase letter
    var containsNumbers = /\d/.test(password);       // At least one number
    var containsSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password); // At least one special character

    // Check if the password meets all criteria
    var isValid = true;
    
    if (password.length < minLength) {
        isValid = false;
        alert("Password must be of at least 4 characters ") 
    }
    if( !isValid ) return false  ; 
    if (!containsUpperCase) {
        isValid = false;
        alert("Password should have uppercase")
    }
    if( !isValid ) return false  ; 
    if (!containsLowerCase) {
        alert("Password should have lowercase")
        isValid = false;
    }
    if( !isValid ) return false  ; 
    if (!containsNumbers) {
        alert("Password should have numbers" ) ; 
      isValid = false;
    }
    if( !isValid ) return false  ; 
    if (!containsSpecialChars) {
        alert("Password should have special characters " ) 
        isValid = false;
    }
    if( !isValid ) return false  ; 
    return true;
}