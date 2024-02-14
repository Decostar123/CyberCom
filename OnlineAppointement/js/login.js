
document.querySelector("#doctor").addEventListener("click" , ()=>{
    window.location.href = "doctorRegisteration.html";
    // alert("hi")
})
document.querySelector("#patient").addEventListener("click" , ()=>{
    window.location.href = "patientRegisteration.html";
})
document.querySelector("form").addEventListener('submit' , (e)=>{
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
    console.log( formData ) ;
if(!entry.role ){
    alert("Please Select Your Role !!") ; 
    return ;
}
if( entry.role === "Doctor"){ 
    doctorLogin(entry) ; 
}else{
    patientLogin(entry) ; 
 }

}) ;


function doctorLogin(entry){
    
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ; 
    if( !appointmentObj){
        alert("Please Register First ") ; 
        return ;
        // const obj  = { "doctor" : [] , "patient" :  [] } ; 
        // localStorage.setItem("appointment" , JSON.stringify(obj)) ; 
    }
    appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;

    
     

    let correctIndex = appointmentObj.doctor.findIndex( (obj)=> obj.email === entry.email && obj.password === entry.password )
     
    //  alert(correctIndex) ; 
        if( correctIndex === -1 ){
            alert("Invalid Login Credentials ") ; 
            return ; 
        }else{
            let url = "doctorDashboard.html" ;

            sessionStorage.setItem("doctorID" , appointmentObj.doctor[correctIndex]._id ) ; 


            window.location.href = url;
            // alert(url );
        }

   
}
function patientLogin(entry){
    
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ; 
    if( !appointmentObj){
        alert("Please Register First ") ; 
        return ;
  }
    appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;

    
     

    let correctIndex = appointmentObj.patient.findIndex( (obj)=> obj.email === entry.email && obj.password === entry.password )
     
    //  alert(correctIndex) ; 
        if( correctIndex === -1 ){
            alert("Invalid Login Credentials ") ;
            return ;  
        }else{
            let url = "patientDashboard.html" ;

            sessionStorage.setItem("patientID" , appointmentObj.patient[correctIndex]._id ) ; 
            

            window.location.href = url;
        }

   
}