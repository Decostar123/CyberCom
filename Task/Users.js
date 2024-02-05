

let alterIndex = -1 ; 
document.querySelector("form").addEventListener('submit', (e)=>{
    
    e.preventDefault() ;
    // alert( "Submitted ") ; 
    const entries = new FormData(e.target) ; 
    const inputObj = {} ; 
    for( const entry of entries ){
        const a  = entry[0] ; 
        const b = entry[1] ;

       
            inputObj[a] = b ;
        
    } ; 
    if( alterIndex !== -1 ){
      
        saveEditedChanges( inputObj ) ; 
        alterIndex = -1 ;  
        return ; 
    }     
    insertEntry(inputObj) ; 
    document.querySelector("form").reset() ; 
    
}) ;
function insertEntry( inputObj){
   console.log("InputObj" , inputObj)
    let newRow = document.createElement("tr") ; 
    for( ele of Object.keys(inputObj)){
       
        // if( ele === )
        if( ele === "birthdate"){
            let newColoumn1 = document.createElement("td") ; 
        newColoumn1.textContent = inputObj[ele] ; 
        newRow.append( newColoumn1  )  ;  
        let newColoumn2 = document.createElement("td") ; 
        const age  = calculateAge( inputObj[ele]) ; 
        newColoumn2.textContent = age  ; 
        newRow.append( newColoumn2  )  ;
        console.log( ele ) ;   
            
        }
        else{
            let newColoumn = document.createElement("td") ; 
            newColoumn.textContent = inputObj[ele] ; 
            newRow.append( newColoumn  )  ;  

        }
       
    }
    
    let newColoumn = document.createElement("td") ; 
    let span1 = document.createElement("span") ; 
    span1.textContent = "Edit  " ; 
   
    let span2 = document.createElement("span") ; 
    span2.textContent = "Delete" ;
    span2.classList.add("span2") ;
    span1.classList.add("span1") ;
    newColoumn.append(span1) ; 
    newColoumn.append(span2) ; 
    newRow.append( newColoumn  ) ; 
    
    document.querySelector("table").append(newRow) ; 

    // ID ATTACHED TO THE NEW ROW 
    let tempID = "" + Date.now() ;
    alert( tempID ) ; 
    // newRow.id = tempID ; 
    newRow.setAttribute("id"  , tempID ) ; 
    inputObj._id = tempID ;
    // ATTACHING ID TO THE INPUTOBJ WHICH PUH IN ARRAY 
    
    let arr  = localStorage.getItem("inputForm" ) ; 
    if( arr === null ){
        const temp = [] ; 
        localStorage.setItem("inputForm" , JSON.stringify(temp) ) ; 
    }
//    arr.push()
    arr = localStorage.getItem("inputForm" ) ; 
    // arr.push( inputObj )  ;
     
    inputObj._id = tempID ; 
    inputObj.age = calculateAge( inputObj.birthdate) ;
    arr = JSON.parse( arr) ;
    // PUSHED HERE 
    console.log("inputObj is ", inputObj ) ;
    alert(inputObj)
    console.log( "the arr is  " , arr ) ; 
    arr.push( inputObj ) ;
    
    localStorage.setItem("inputForm" , JSON.stringify(arr) ) ; 
    console.log( "the arr is  " , arr ) ; 
    span2.addEventListener( 'click' ,  ()=>{
     
        deleteEntry( newRow , tempID ) ; 
    })
    span1.addEventListener( 'click' , ()=>{
        modifyEntry( tempID   ) ; 
    })
    alert( " Form submitted " )  ; 
    document.querySelector("form").reset() ; 

}
function deleteEntry( newRow , tempID ){


    alert( `index to be deleted is ${tempID}`  )  ;

    const deleteDecision = confirm("Are you sure you want to delete ") ; 
    if( !deleteDecision ) return ;
    newRow.remove() ; 

    let arr  = localStorage.getItem("inputForm" ) ; 
    arr = localStorage.getItem("inputForm" ) ; 
    arr = JSON.parse( arr) ; 

    arr = arr.filter( ( ele ) => ele._id !== tempID )  ; 

    localStorage.setItem("inputForm"  , JSON.stringify( arr)) ;


}
document.addEventListener('DOMContentLoaded', () => {
    // alert("hi");



let adminEntry = localStorage.getItem("adminDetails") ; 
// userName: "Deco3", mail: "", pass: "", confirmPass: "", city: "", state: ""}
adminEntry = JSON.parse(adminEntry) ;
document.querySelector("#adminName").textContent = adminEntry.userName ;



    let formArray = localStorage.getItem("inputForm");
    if (!formArray) return;
    formArray = JSON.parse(formArray);
    // document.querySelector("#adminName").textContent = formArray.userName ;

    console.log(formArray);
    
    for( index in  formArray ){
        // {userName: "a", email: "decostarsharma113@gmail.com", password: "deco", birthdate: "2002-01-22",…}

        inputObj = formArray[index ] ; 
        let newRow = document.createElement("tr") ; 
        let insideHTML = `<td>${inputObj.userName}</td>
                            <td>${inputObj.email}</td>
                            <td>${inputObj.password}</td>
                            <td>${inputObj.birthdate}</td>
                            <td>${inputObj.age}</td>` ;

        newRow.innerHTML = insideHTML ;
        // for( ele of Object.keys(inputObj)){
        //     if( ele === "_id" ) continue ; 
        //     // if( ele === 'age' ) continue ; 
        //     if( ele === "birthdate"){
        //     let newCol1 = document.createElement("td") ; 
        //     newCol1.textContent = inputObj[ele] ; 
        //     newRow.append( newCol1  )  ;  
        //     let newCol2 = document.createElement("td") ; 
        //     newCol2.textContent = "----" ; 
        //     newRow.append( newCol2  )  ;
        //     console.log( ele ) ;  
        //     continue ;  
            
        // }
                // console.log( ele) ; 
                // const newCol = document.createElement("td") ; 
                // newCol.textContent = inputObj[ele] ; 
                // newRow.append( newCol  )  ;  
    // }
    newRow.setAttribute("id" , formArray[index]._id )
    let newCol = document.createElement("td") ; 
    let span1 = document.createElement("span") ; 
    span1.textContent = "Edit  " ; 
    span1.classList.add("span1") ;

    let span2 = document.createElement("span") ; 
    span2.textContent = "Delete" ;
    span2.classList.add("span2") ;
    newCol.append(span1) ; 
    newCol.append(span2) ; 
    newRow.append( newCol  ) ; 
    document.querySelector("table").append(newRow) ; 
    span2.addEventListener( 'click' ,  ()=>{
        deleteEntry( newRow , inputObj._id  ) ; 
    })
    span1.addEventListener('click' , ()=>{
        modifyEntry(  inputObj._id  ) ; 
    })

    } 
    //  modifyEntry( 0 , {} )  ;
});


function modifyEntry( uniqueID     ){
    
    // 1) ALTERINDEX IS SET 
    document.querySelector("#submitBtn").textContent="Save Edited Changes" ; 
    alterIndex = uniqueID ; 
    let arr  = localStorage.getItem("inputForm" ) ; 
   
  
    arr = JSON.parse( arr) ; 
    // GOT ALL THE TR VALUES 
    let entry1=document.querySelectorAll("tr"); 
    console.log( "entry1 isthud ", entry1 ) ; 
    let ppp = [] ; 
    // FOR EACH BEACUSE THE FILTER WAS NOT WORKING ON ENTRY1
    entry1.forEach( ele => {
        if( ele.id === uniqueID ){
            ppp = ele ; 
        }
    } ) ; 
    entry1 =  ppp  ; 
//  FROM HERE GETTING THE TD VALUES 
    const entry2 = entry1.children ; 
    console.log( entry2 ) ; 
    // console.log( arr  , "tempID" , tempID )   ;
    
// GETTING THE CORRESPONDING WNTRY FROM THE ARR 
    let tempEntry = arr.filter( ele => ele._id === uniqueID ) ; 
    tempEntry = tempEntry[0] ; 
    console.log("tempentry is " , tempEntry)
    console.log( tempEntry.userName )  ;            
    // <input id="userNname" name="userName" placeholder="Name">
    //             <input id="mail" type="email" name="email" placeholder="Email">
    //             <input id="password" name="password" placeholder="Password">
    //             <input id="birthdate" type="date" name="birthdate" placeholder="BirthDate">
    // SETTING THE VALUES HERE OF INPUT VALUES 
     document.querySelector("#userName").value = tempEntry.userName ; 
     document.querySelector("#mail").value = tempEntry.email ;
     document.querySelector("#password").value = tempEntry.password ;
     document.querySelector("#birthdate").value = tempEntry.birthdate ;

}

function saveEditedChanges( inputObj ){

    // SETTING VALUES AT 2 PLACE , THE ROW AND THE INPUT OBJECT 
   
    console.log( "the input object is " , inputObj ) ; 
    let arr  = localStorage.getItem("inputForm" ) ; 
   
    arr = localStorage.getItem("inputForm" ) ; 
    arr = JSON.parse( arr) ; 
    // arr[index] = obj ; 
    console.log( " AlterIndex" , alterIndex ); 
    let entry1 = document.querySelectorAll("tr") ;
    console.log( " value of entry1" , entry1 ) ; 
     let  theRow = null ; 
    //  GOT THE REQUIRED TR 
    entry1.forEach( ele => {
        console.log("ele.id" , ele.id ) ; 
        if( ele.id === alterIndex ){
            theRow = ele   ; 
        }
    } ) ; 
    entry1 = theRow  ; 

    console.log( 'value of entry1', entry1 ) ;
    // GOT IT'S CHILDREN   
    const entry2 = entry1.children ; 
    
   

    inputObj._id = alterIndex ; 
    
    // document.querySelector("#userName").value = tempEntry.userName ; 
    //  document.querySelector("#mail").value = tempEntry.email ;
    //  document.querySelector("#password").value = tempEntry.password ;
    //  document.querySelector("#birthdate").value = tempEntry.birthdate ;


    entry2[0].textContent = inputObj.userName ; 
    entry2[1].textContent = inputObj.email ; 
    entry2[2].textContent = inputObj.password ; 
    entry2[3].textContent = inputObj.birthdate ;
    entry2[4].textContent = calculateAge(inputObj.birthdate) ;
    
    let correctIndx =  0 ; 
     arr.forEach( (ele , ind ) => {
        if( ele._id === inputObj.id ) {
            correctIndx = ind ; 
        }
     }) ; 
     console.log("Corrrect indes" , correctIndx )
    // arrEntry = arrEntry[0]  ; 
    
    arr[correctIndx].userName = document.querySelector("#userName").value  
    arr[correctIndx].email = document.querySelector("#mail").value 
    arr[correctIndx].password =  document.querySelector("#password").value
    arr[correctIndx].birthdate = document.querySelector("#birthdate").value ; 
    arr[correctIndx].age = calculateAge(inputObj.birthdate) 
    
    localStorage.setItem( 'inputForm' , JSON.stringify(arr)) ;
    alterIndex = -1 ; 
    alert( "Changes were saved") ; 
    document.querySelector("form").reset() ;
    document.querySelector("#submitBtn").textContent = "Add User" ; 
      

}


document.querySelector("#dashboard").addEventListener( 'click' , ()=>{
    window.open( "http://127.0.0.1:5500/Task/Dashbord.html"  , "_blank")
})

function calculateAge(dateOfBirth) {
// Parse the date of birth string into a Date object
const dob = new Date(dateOfBirth);

// Get the current date
const currentDate = new Date();

// Calculate the difference in years between the current date and the date of birth
let age = currentDate.getFullYear() - dob.getFullYear();

// Adjust the age if the current date is before the birthday
// Check if the current month and day are before the birth month and day
if (currentDate.getMonth() < dob.getMonth() || 
(currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
age--;
}

return age;
}

