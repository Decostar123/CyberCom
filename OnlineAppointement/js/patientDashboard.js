document.addEventListener('DOMContentLoaded', function() {
    // DOM is fully loaded and ready for manipulation
   let ID =  getPateintID() ; 
   let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let name = "" ; 
    let index = appointmentObj.patient.findIndex( ele => ele._id === ID ) ; 
    // alert(  index );
    // if( index === -1  ) return ; 
    // console.log( appointmentObj.patient[index].userName)
    // alert( appointmentObj.patient[index].userName)
    document.querySelector("#adminName").textContent =appointmentObj.patient[index].userName
    // Your initialization code or actions here
});
document.querySelector("#showBookings").addEventListener(('click') , ()=>{
    alert("Showing Bookings...") ; 
    addInnerHTML()

})


function addInnerHTML(){

    document.querySelector("#right").innerHTML= "";
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let meetings = appointmentObj.meetings ;
    let doctorEntry = appointmentObj.doctor ; 
    let patientID =  getPateintID() ; 
    for( obj of meetings ){
        let doctorID = obj.doctorID ; 
        let doctorIndex = doctorEntry.findIndex( ele => ele._id === doctorID) ; 

        if( doctorIndex === -1 ){
           continue ; 
        }

        let doctorName = doctorEntry[doctorIndex].userName ; 
        let div = document.createElement("div") ; 
        div.classList.add("bookings") ; 
         div.innerHTML = `
         
         <label>From:</label> <label>${obj.from}</label>
        <br>
        <label>To:</label> <label>${obj.to}</label>
        <br>
        <label>DoctorName:</label> <label>${doctorName}</label>
        <br>
        <label>Status:</label> <label>${obj.status}</label>
        <br>
        
         
    `
        const btn1 = document.createElement("button") ; 
        btn1.textContent = "Cancel Meeting" ; 
        btn1.classList.add("cancelMeeting")
        
        document.querySelector("#right").append( div ) ; 
        
        if( obj.status !== 'Rejected'){
            div.append(btn1) ; 
        }
        btn1.addEventListener('click' , ()=>{
            const ans = confirm("Are you sure you want to cancel the meeting ") ; 
            if( !ans ) return ; 
            cancelMeeting(doctorID , patientID ) ; 
        })

    }


}
function cancelMeeting(){

}
document.querySelector("#confirm").addEventListener('click' , ()=>{
    // alert("Done") ; 
    // let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    // let doctorEntry = appointmentObj.doctor ; 
    // appointmentObj.meetings = [] ; 
    // localStorage.setItem("appointment"  , JSON.stringify( appointmentObj))
    // return ; 
    showAvailableDoctors();
    // const timings = {"from" : `${from}:${fromTime}` , "to":`${to}:${toTime}`} ;
    // if( !doctorEntry[param1Value].slots ){
    //     doctorEntry[param1Value].slots = [] ; 
    // }
    // doctorEntry[param1Value].slots.push( timings ) ; 
    // localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 

})

function showAvailableDoctors(){
    let from = document.querySelector("#from").value ;
    let fromTime = document.querySelector("#fromTime").value ; 

    let to = document.querySelector("#to").value ;
    let toTime = document.querySelector("#toTime").value ; 

    console.log(from, fromTime, to,toTime) ; 
  
    
   
    
    // let  param1Value = getPatientIndex() ; 
   
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let doctorEntry = appointmentObj.doctor ; 
    console.log(doctorEntry ) ;
    let gotMeetings = false;
    document.querySelector("#right").innerHTML = "" ; 
    for( let index in doctorEntry ){
        doctorObj = doctorEntry[index] ; 
        for( let doctorTimings of doctorObj.slots ){
            if( compareTimings( from,fromTime , to, toTime,doctorTimings )){
                gotMeetings = true ; 
                const tempID = Date.now() ; 
                let div = document.createElement("div") ; 
                div.classList.add("bookings") ;

                div.innerHTML = `
                <label>Name:</label> <label>${doctorObj.userName}</label>
                <br>
                <label>Experince:</label> <labekl>${doctorObj.experience}</label>
                <br>
                <label>Expertise:</label> <labekl>${doctorObj.expertise}</label>
                 <br>
                <br>
                `
                let btn1 = document.createElement("button") ; 
                btn1.classList.add("book") ; 
                btn1.textContent = "Book"

                // let btn2 = document.createElement("button") ; 
                // btn2.classList.add("cancel") ; 
                // btn2.textContent = "Cancel" ; 
                div.append(btn1) ; 
                // div.append(btn2) ; 
                // console.log(div) ; 
                // alert(index)
                document.querySelector("#right").append(div) ; 
                btn1.addEventListener("click" , ()=>{
                        const ans = confirm("Are you sure you wnat to book the Doctor ?") ; 
                        if( !ans ) return ; 

                        let patientID =  getPateintID() ;
                        let doctorID =  doctorObj._id ; 

                        // alert(`${patientID}  ${doctorID}`) ; 
                        // return;
                        // saveEntryForPatient(  patientID ,   doctorID ) ; 
                        // saveEntryForDoctor( patientID ,   doctorID );
                        saveMeeting( patientID ,doctorID,doctorTimings  ) ;
                }) 

                         //     btn2.addEventListener("click" , ()=>{
            //         const ans = confirm("Are you sure you wnat to Cacel metting with the Doctor ?") ; 
            //         if( !ans ) return ; 

            //         let patientID =  getPateintID() ;
            //         let doctorID =  doctorObj._id ; 

            //         // alert(`${patientID}  ${doctorID}`) ; 
            //         // return;
            //         // saveEntryForPatient(  patientID ,   doctorID ) ; 
            //         // saveEntryForDoctor( patientID ,   doctorID );
            //         cancelMeeting( patientID ,doctorID  ) ;
            // }) 
            if( !gotMeetings) alert("No meeting scheduled ")
            }
        }
    }

    // alert(gotMeetings )
    if( !gotMeetings ) alert("No Available Doctos In The Slot  ")

}

function invalidMeeting(){
    
}
function  cancelMeeting(  doctorID , patientID ){
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let meetings = appointmentObj.meetings ;

    // alert(`${ patientID} ${ doctorID}`)
    console.log( meetings )  ; 
    let meetingIndex  = meetings.findIndex( ele => {
        console.log(ele.patientID , patientID , ele.doctorID , doctorID )
       return ele.patientID===patientID && ele.doctorID === doctorID
    } ) ; 
    if( meetingIndex === -1 ){
        // alert(meetingIndex)
        alert("Error occured ")  ;
        return ; 
    }
    // alert( meetingIndex)
    meetings[meetingIndex].status = "Rejected" ; 
    localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 

    alert("Request Is Cancelled To The Doctor For Meeting");
    addInnerHTML();
}
function saveMeeting( patientID ,doctorID,doctorTimings){
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let meetings = appointmentObj.meetings ;
//  appointmentObj.meetings = [] ; 
//  localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 
// return;

    let doctorIndex = appointmentObj.doctor.findIndex( ele => ele._id === doctorID) ; 

    let from = appointmentObj.doctor[doctorIndex].from ; 

    let to = appointmentObj.doctor[doctorIndex].to ; 

    
    let duplicate = duplicateMeeting(patientID, doctorID) ;
    if(duplicate){
        alert("Meeing Is Already Scheduled ")  ; 
        return ; 
    }

    let obj = {  "patientID" : patientID , "doctorID" : doctorID , "status" :"Pending" , "from" : doctorTimings.from , "to" : doctorTimings.to  } ; 
    meetings.push( obj ) ; 
    localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 

    alert("Request Is Send To The Doctor For Meeting");
    
}

function duplicateMeeting(patientID, doctorID){
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let meetings = appointmentObj.meetings ;
    let index = meetings.findIndex( ( ele) => ele.patientID === patientID && ele.doctorID === doctorID ) ; 
    if( index === -1 ) return false ; 
    return true ; 
}
function getPatientIndex(){
    
    // alert( typeof(doctorID))
    let patientID = getPateintID() ; 
    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let doctorEntry = appointmentObj.patient ; 

    let index  = doctorEntry.findIndex( ele =>  ele._id === patientID ) ; 
// alert(index) ; 
    return index ;

}

function getPateintID(){
    let patientID = sessionStorage.getItem("patientID") ; 
    patientID = Number(patientID);
    return patientID ; 
}
function saveEntryForPatient( patientID ,   doctorID ){

    let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
    let patientMeeting = appointmentObj.patientMeetings ;
    
    // let index = patientMeeting.findIndex( ele => ele.patientID ===  )
}
    function saveEntryForDoctor( doctorIndex, patientIndex, div  ){
       const bookingID = Date.now() ; 
        let appointmentObj = JSON.parse(localStorage.getItem("appointment") ) ;
        let doctorEntry = appointmentObj.doctor ; 
        let patientEntry = appointmentObj.patient ; 
        // alert(patientIndex)
        let patientObj = { name : patientEntry[patientIndex].userName , status :"Pending" } ; 
        patientObj._id = bookingID ; 
        patientObj.patientIndex = patientIndex ; 
        if( !doctorEntry[doctorIndex].patientsEntry){
            doctorEntry[doctorIndex].patientsEntry = [] ; 
        }
        // else{
        //     doctorEntry[doctorIndex].patientsEntry = [] ;
        //     localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 
        //     alert("Done")
        //     return ;
        // }
        doctorEntry[doctorIndex].patientsEntry.push(patientObj ) ; 
        localStorage.setItem("appointment" , JSON.stringify(appointmentObj)) ; 

       

        alert("Request Has Been Send To Doctor For Appointment !!") ; 
   
        const lbl1 = document.createElement("label") ; 
        const lbl2 = document.createElement("label") ; 
        lbl1.textContent = "OrderID"
        lbl2.textContent = bookingID;
        const br = document.createElement("br") ; 
        div.append(br) ; 
        div.append( lbl1) ; 
        div.append(lbl2 ) ; 

    }
  function compareTimings(  from, fromTime,  to,toTime,  doctorTimings){
    from = Number(from) ;
    if(fromTime === 'pm'){
        from = 12+from ;
    } 
    to = Number(to) ; 
    if(toTime === 'pm'){
        to = 12+to ;
    } 
    let arr1 = doctorTimings.from.split(":") ;
    arr1[0] = Number(arr1[0]) ;
    if( arr1[1] === 'pm'){
        arr1[0] = 12+arr1[0]
    }
    let arr2 = doctorTimings.to.split(":") ;
    arr2[0] = Number(arr2[0]) ;
    if( arr2[1] === 'pm'){
        arr2[0] = 12+arr2[0]
    }
    if( arr1[0] >= from && arr1[0] <= to && arr2[0] >= from && arr2[0] <= to ) return true ; 
        console.log( arr1[0], arr2[0] , from, to)
    return false ; 

    
  }
   