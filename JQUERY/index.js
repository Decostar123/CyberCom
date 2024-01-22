
$("#booking").submit( (e)=>{
    e.preventDefault() ;
    // CAN TAVEL THE FORM BY THIS 
    // const formData = new FormData(document.querySelector("#booking")) ; 
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
     
    // alert(" submitted ") ; 
    // console.log( form.entries  ); 

    // for ( const )
    var x = $("#booking").serializeArray( ) ; 
    console.log( x ) ; 
    var bookingInfo = {} ; 
    for( entry of x ){
        bookingInfo[entry.name] = entry.value ; 
    }
    console.log( bookingInfo ) ; 
    let errorCount = 0 ; 
    let decision = validateName( bookingInfo.firstName  ) ; 
    // alert( decision ) ; 
    if ( !decision ){
            errorCount++ ; 
            var child= "Incorrect First Name" ; 
            
            $("#incorrectFirstName").text( "Incorrect First Name" ) ;
            // console.log(  $("#incorrectFirstName").val() ) 
    }else{
        $("#incorrectFirstName").text( "" ) ;
    }
     decision = validatePhoneNumber( bookingInfo.phoneNumber  ) ; 
    if ( !decision ){
            errorCount++ ; 
            var child= 'Incorrect Phone Number'; 
            $("#incorrectPhoneNumber").text(child ) ; 
    }else{
        $("#incorrectPhoneNumber").text("") ; 
    }
    decision = validateMail( bookingInfo.mail  ) ; 
    // alert( decision ) ; 
    if ( !decision ){
            errorCount++ ; 
            var child='Incorrect Email' ; 
            $("#incorrectMail").text(child ) ; 
    }else{
        $("#incorrectMail").text("" ) ; 
    }
    decision =  bookingInfo.gender ; 
    if( !decision ){
        errorCount++ ; 
        var child= ' Select gender' ; 
        $("#incorrectGender").text(child ) ; 
    }else{
        $("#incorrectGender").text("" ) ; 
    }
    decision = validateQuantity( bookingInfo.seatQuantity);

    if( !decision ){
        errorCount++ ; 
        var child= ' Invalid Seat Quantity '; 
        $("#incorrectSeatQuantity").text(child ) ; 
    }else{
        $("#incorrectSeatQuantity").text("" ) ; 
    }

    decision = validateDOB( bookingInfo.DOB);
    if( !decision ){
        errorCount++ ; 
        var child= ' Invalid Date of birth ' ; 
        $("#incorrectDOB").text(child ) ; 
    }else{
        $("#incorrectDOB").text("" ) ; 
    }
    if( errorCount === 0 ){
        
        var child= 'Booking Done Successfuly' ; 
        $("#correctDeatils").text( child ) ; 
        setTimeout(()=>{
             
        } , 1000)
        
    }else{
        $("#correctDeatils").text( "" ) ; 
    }
    errorCount = 0 ; 




})

function validateName(name){
    if( name.length === 0 ) return false ; 
    var nameRegex = /^[a-zA-Z]+$/;
    return  name.match( nameRegex ) ; 
}
function validatePhoneNumber( phoneNumber){
    if( phoneNumber.length === 0 ) return false ; 
    var phoneNumberRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/; 
    return phoneNumber.match(phoneNumberRegex) ;
}
function validateMail( mail ){
    if( !mail ) return false ;
    var mailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return mail.match(mailRegex) ;
}
function  validateQuantity( quantity ){
    if( !quantity ) return false  ;  
    const num = Number(quantity) ;
    if ( !num ) return false   ;
    if( num <=0 || num >=11 ) return false ;  
    return true  ;  
}
function validateDOB( DOB ){
    // alert( typeof(DOB) ) ;
    if( DOB.length === 0 ) return false ; 
    if( !DOB ) return false ; 
    const age = getAge( DOB ) ;
    // alert( age  ) ; 
    if( age <=17 || age >= 101 ) return false ;
    return true ;
}

function getAge(dateString) {
var today = new Date();
var birthDate = new Date(dateString);
var age = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}
return age;
}

