
document.addEventListener('DOMContentLoaded', function() {
    // DOM is fully loaded and ready for manipulation
   let ID =  getDoctorID() ; 
   let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let name = "" ; 
    let index = appointmentObj.doctor.findIndex( ele => ele._id === ID ) ; 
    // alert(  index );
    // if( index === -1  ) return ; 
    // console.log( appointmentObj.patient[index].userName)
    // alert( appointmentObj.patient[index].userName)
    document.querySelector("#adminName").textContent =appointmentObj.doctor[index].userName
    // Your initialization code or actions here
});

document.querySelector("#confirm").addEventListener('click' , ()=>{
    // alert("Done") ; 
    const ans = confirm("Are you sure of the timings ?") ; 
    if( !ans ) return ;
    let from = document.querySelector("#from").value ;
    let fromTime = document.querySelector("#fromTime").value ; 

    let to = document.querySelector("#to").value ;
    let toTime = document.querySelector("#toTime").value ; 

    console.log(from, fromTime, to,toTime) ; 
    
//     let queryParams = new URLSearchParams(window.location.search);
//     // queryParams = Number(queryParams);
// // Access the value of a parameter
//     let param1Value = queryParams.get('param1');
//     // alert(param1Value); 
    param1Value =getDoctorIndex() ; 
    // return  ; 
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let doctorEntry = appointmentObj.doctor ; 
    console.log(doctorEntry ) ;
    // alert("Aaaaaaaaa")
    const timings = {"from" : `${from}:${fromTime}` , "to":`${to}:${toTime}`} ;
    if( !doctorEntry[param1Value].slots ){
        doctorEntry[param1Value].slots = [] ; 

    }
    // alert("bbbbbbbbbbb")
    // if( )
    doctorEntry[param1Value].slots.push( timings ) ; 
    localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 
    alert("Your timings Have Been Addedd") ; 
})
function getDoctorIndex(){
    let doctorID = sessionStorage.getItem("doctorID") ; 
    doctorID = Number(doctorID)
    // alert( typeof(doctorID))
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let doctorEntry = appointmentObj.doctor ; 

    let index  = doctorEntry.findIndex( ele =>  ele._id === doctorID ) ; 
// alert(index) ; 
    return index ;

}
document.querySelector("#showSlots").addEventListener("click" , ()=>{


    document.querySelector("#right").innerHTML = "";
    let doctorIndex = getDoctorIndex( ) ; 
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let doctorEntry = appointmentObj.doctor[doctorIndex] ;

    for(slot of doctorEntry.slots){
        let html = `
        <div class="bookings">
                <label>From:</label> <label>${slot.from}</label>
                <br>
                <label>To:</label> <labekl>${slot.to}</label>
               
            </div>
            `
       
        document.querySelector("#right").insertAdjacentHTML("beforeend", html );
    }


})

document.querySelector("#showBookings").addEventListener("click" , ()=>{
    
    addInnerHTML() ; 
   

})
function getDoctorID(){
    let doctorID = sessionStorage.getItem("doctorID") ; 
    doctorID = Number(doctorID);
    return doctorID ; 
}
function addInnerHTML(){
// alert("111111111111111")
    document.querySelector("#right").innerHTML="";
    let doctorID = getDoctorID() ; 
//    alert(doctorID) ; 
//    return ; 

    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
        
    let meetings = appointmentObj.meetings ; 
   
    for (  let meetingObj  of meetings ) {

        if( meetingObj.doctorID !== doctorID ) continue ; 
        let patientIndex = appointmentObj.patient.findIndex( ele => ele._id === meetingObj.patientID ) ; 

        if( patientIndex === -1 ){
            continue ; 
        }

       
        let div = document.createElement("div");
        // alert(meetingObj.status );
    
        div.innerHTML = `
            <label>From:</label> <label>${meetingObj.from}</label>
            <br>
            <label>To:</label> <label>${meetingObj.to}</label>
            <br>
            <label>Patient Name:</label> <label>${appointmentObj.patient[patientIndex].userName}</label>
            <br>

            <label>Status:</label> <label>${meetingObj.status}</label>
            <br>
            <br>
        `;
    
        const btn1 = document.createElement("button") ; 
        const btn2 = document.createElement("button") ;
        const btn3 = document.createElement("button") ; 
        btn1.textContent  = "Accept" ; 
        btn1.classList.add("book") ; 
        btn2.textContent = "Reject" ; 
        btn2.classList.add("cancel") ;
        btn3.textContent = "Reschedule" ; 
        btn3.classList.add("reschedule") ; 
        
        if(meetingObj.status === 'Pending' ){
            div.append(btn1) ; 
            div.append(btn2) ; 
        }

    // meetings[meetingIndex].status = "Rescheduled" ; 
    if( meetingObj.status === 'Accepted' || meetingObj.status === 'Rescheduled'  ){
            div.append(btn2) ;
            div.append(btn3) ;
        }
        // div.append(btn1) ;
        // div.append(btn2) ;

        btn1.addEventListener("click" , ()=>{
            const ans = confirm("Are you sure you want to acept the meeting ?") ; 
            if( !ans ) return ; 
            setAvailable( doctorID , meetingObj.patientID ) ; 
        })

        btn2.addEventListener("click" , ()=>{
            const ans = confirm("Are you sure you want to reject the meeting ?") ; 
            if( !ans ) return ; 
            rejectMeeting( doctorID , meetingObj.patientID ) ; 
        })

        btn3.addEventListener("click" , ()=>{
            const ans = confirm("Are you sure you want to reschdule the meeting ?") ; 
            if( !ans ) return ; 
            rescheduleMeeting( doctorID , meetingObj.patientID ) ; 
        })

        div.classList.add("bookings");
        document.querySelector("#right").append(div);
        
        console.log(div);
    }
    
}
function rescheduleMeeting( doctorID , patientID ) {
    // alert("ih")
    document.querySelector("#black").style.display = "block" ; 
    document.querySelector("#reschedule").style.display = "block" ; 

    document.querySelector("#rconfirm").addEventListener("click" , ()=>{


        const ans = confirm("Are you sure of the timings ?") ; 
        if( !ans ) return ;
        let rfrom = document.querySelector("#rfrom").value ;
        let rfromTime = document.querySelector("#rfromTime").value ; 
    
        let rto = document.querySelector("#rto").value ;
        let rtoTime = document.querySelector("#rtoTime").value ; 


        console.log( rfrom,rfromTime,rto,rtoTime ) ; 

        setReschduleTimings(doctorID , patientID, rfrom,rfromTime,rto,rtoTime )

    })
}

function   setReschduleTimings(doctorID , patientID, rfrom,rfromTime,rto,rtoTime ){
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
        
    let meetings = appointmentObj.meetings ; 

    let meetingIndex = meetings.findIndex(  ele => ele.doctorID === doctorID && ele.patientID == patientID ) ; 
    if( meetingIndex === -1 ){
        alert("Try Again Later ") ; 
        removeBlackScrren();
        return ; 
    }
    meetings[meetingIndex].from = rfrom + ":" + rfromTime;
    meetings[meetingIndex].to = rto + ":" + rtoTime;
    meetings[meetingIndex].status = "Rescheduled" ; 
    localStorage.setItem( "appointment" , JSON.stringify(appointmentObj)) ; 

    removeBlackScrren();
    alert("Meeting is Reschduled ") ;
    addInnerHTML();

}

function removeBlackScrren(){
    document.querySelector("#black").style.display = "none" ; 
    document.querySelector("#reschedule").style.display = "none" ; 

}
function rejectMeeting(doctorID, patientID){
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
        
    let meetings = appointmentObj.meetings ; 

    let meetingIndex = meetings.findIndex(  ele => ele.doctorID === doctorID && ele.patientID == patientID ) ; 
    if( meetingIndex === -1 ){
        return ; 
    }
    // alert( meetings[meetingIndex].status )
    // if( meetings[meetingIndex].status == 'Pending' ){
    //     alert("First Accept The Meeting") ; 
    //     return ; 
    // } ; 
    meetings[meetingIndex].status = 'Rejected' ; 

    // alert( meetings[meetingIndex].status )

    console.log( appointmentObj)

    localStorage.setItem( "appointment" , JSON.stringify(appointmentObj)) ; 
alert("Meeting is Rejected ") ;
addInnerHTML();
    
}

function setAvailable(doctorID, patientID ){
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
        
    let meetings = appointmentObj.meetings ; 

    let meetingIndex = meetings.findIndex(  ele => ele.doctorID === doctorID && ele.patientID == patientID ) ; 
    if( meetingIndex === -1 ){
        return ; 
    }
    if( meetings[meetingIndex].status == 'Accepted' ){
        alert("First Accept The Meeting") ; 
        return ; 
    } ; 
    // alert(meetingIndex);
    meetings[meetingIndex].status = 'Accepted' ; 

    // alert( meetings[meetingIndex].status )

    console.log( appointmentObj)

    localStorage.setItem( "appointment" , JSON.stringify(appointmentObj)) ; 
alert("Meeting is scheduled ") ;
addInnerHTML();
    
}
  
   