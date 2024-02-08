
// let todoTask = null, todoPriority=null, todoDue = null;  ; 
let editID = null ; 
let toDoDiv = null ; 
document.addEventListener('DOMContentLoaded' , ()=>{
    // const obj = { "entry" : val , "priority":priority , "duedate":duedate, _id : tempID } ;


    let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    if( !todoArr){
        const temp = [] ; 
        localStorage.setItem("todoArr" , JSON.stringify(temp)) ; 
    }
    todoArr = JSON.parse(localStorage.getItem("todoArr") );
    for( entry of todoArr ){
        const todoDiv = document.createElement("div") ; 
        todoDiv.classList.add("todoTask") ;
        const checkbox  = document.createElement("input") ;
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");
        const p5 = document.createElement("p");
        const btn = document.createElement("button") ;
        const icon = document.createElement("i");

        checkbox.setAttribute("type" , "checkbox") ; 
        checkbox.classList.add("check") ;
        if( entry.checked ){
            checkbox.checked =  true  ; 
            todoDiv.style["text-decoration"] = "line-through" ;
        }else{
            checkbox.checked =  false ;
            todoDiv.style["text-decoration"] = "none" ;
        }
        if( !entry.checked){
            const currDate = new Date()  ; 
            const dueDate = new Date( entry.duedate ) ; 
            if( dueDate < currDate ){
                todoDiv.style.color = "red";
            }
        }
       
    
        p1.classList.add("list") ; 
        p1.textContent = entry.entry ; 
        
        p2.classList.add("status") ; 
        btn.textContent = "Edit" ; 
        p2.append( btn ) ; 

        p3.classList.add("close") ; 
        icon.classList.add("bx") ; 
        icon.classList.add("bx-comment-x") ; 
        p3.append(icon) ; 

        p4.classList.add("priority");
        p4.textContent = entry.priority ; 
    
        p5.classList.add("endDate") ; 
        p5.textContent = entry.duedate ; 
    

        todoDiv.id = entry._id ; 
        todoDiv.append(checkbox);
        todoDiv.append(p1) ; 
        todoDiv.append(p4) ; 
        todoDiv.append(p5) ; 
        todoDiv.append(p2) ;
        todoDiv.append(p3) ; 

        
        document.querySelector("#taskBody").append(todoDiv );

        icon.addEventListener('click' , ()=>{
            deleteToDo( entry._id , todoDiv  ) ; 
         })

        btn.addEventListener('click' , ()=>{
            alert("11111111")
            editChanges( entry._id, p1,p4,p5 , todoDiv) ;
        });
        checkbox.addEventListener("change" , ()=>{
            handleCheckBox( checkbox , todoDiv, entry._id, entry.duedate  ) ; 
        })
       
        // checkDueDate( todoDiv , entry.duedate , entry.checked, entry.duedate  ) ; 
    }

}) ; 


document.querySelector("#add").addEventListener( "click" , ()=>{
if( editID ){
    sevaChanges() ; 
    return ; 
}
const val = document.querySelector("#container1 input").value ; 

    saveEntry() ; 
    
})

function saveEntry(){
    const val = document.querySelector("#input1").value ; 
   
    const priority = document.querySelector("#input2").value ; 
    const duedate = document.querySelector("#input3").value ; 

    if( !val || !priority || !duedate ){
        alert("Please Enter all the details !!") ; 
        return;
    }
    // alert(`${val}  ${priority}  ${duedate}`) ; 
    // return ; 
    let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    if( !todoArr){
        const temp = [] ; 
        localStorage.setItem("todoArr" , JSON.stringify(temp)) ; 
    }
    todoArr = JSON.parse(localStorage.getItem("todoArr") );
    // console.log( todoArr ) ; 
    const tempID = "" + Date.now() ; 
    const obj = { "entry" : val , "priority":priority , "duedate":duedate, _id : tempID , "checked" : false , "category":"" } ;
    const todoDiv = document.createElement("div") ; 
    todoDiv.classList.add("todoTask") ;

    const checkbox  = document.createElement("input") ;
     
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const p5 = document.createElement("p");
    const btn = document.createElement("button") ;
    const icon = document.createElement("i") ; 
    
    const select = document.createElement("select") ; 

    const option1 = document.createElement("option") ; 
    option1.textContent = "office" ;
    option1.value = "office" ; 
    const option2 = document.createElement("option") ; 
    option2.textContent = "home" ;
    option2.value = "home" ; 
    const option3 = document.createElement("option") ; 
    option3.textContent = "general" ;
    option3.value = "general" ;
    select.append(option1)
    select.append(option2)
    select.append(option3) ; 
    select.classList.add("categori") 
    // console.log(todoDiv, p1,p2,p3 ) ; 

    checkbox.setAttribute("type" , "checkbox") ; 
    checkbox.classList.add("check") ; 
    // checkbox.setAttribute("checked" , )

    p1.classList.add("list") ; 
    p1.textContent = val ; 

    p2.classList.add("status") ; 
    btn.textContent = "Edit" ; 
    p2.append( btn ) ; 

    p3.classList.add("close") ; 
    icon.classList.add("bx") ; 
    icon.classList.add("bx-comment-x") ; 
    p3.append(icon) ; 

    p4.classList.add("priority");
    p4.textContent = priority ; 

    p5.classList.add("endDate") ; 
    p5.textContent = duedate ; 

    todoDiv.id = tempID ; 
    // todoDiv.append(checkbox) ;
    todoDiv.append(p1) ; 
    todoDiv.append(select);
    todoDiv.append(p4) ; 
    todoDiv.append(p5) ; 
    todoDiv.append(p2) ;
    todoDiv.append(p3) ; 
// 11111111111111111111111111111111111111111111
//     todoArr.push( obj ) ; 

    // todoArr.sort((ele1,ele2)=> Number(ele2.priority) - Number(ele1.priority))

    // let arr[] = 
    localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
    
    const childrenArr =  document.querySelector("#taskBody") ; 
    let index = 0 ; 

    insertAtProperIndex( todoDiv , obj ) ; 
// 2222222222222222222222222222222222222
//     document.querySelector("#taskBody").append(todoDiv ) ;


    icon.addEventListener('click' , ()=>{
        deleteToDo( tempID , todoDiv  ) ; 
    })

    btn.addEventListener('click' , ()=>{
        alert("hi")
    editChanges( tempID, p1 , p4, p5, todoDiv ) ;
    })

    checkbox.addEventListener("change" , ()=>{
        handleCheckBox( checkbox , todoDiv, tempID, duedate ) ; 
    }) ; 
    alert("Task saved successfully !!") ; 

    select.addEventListener('change', ()=>{
        handleSelect( tempID , select ) ; 
    })
    // option2.addEventListener('click', ()=>{
    //     handleSelect( tempID , "home") ; 
    // })
    // option3.addEventListener('click', ()=>{
    //     handleSelect( tempID , "general") ; 
    // })
    // checkDueDate( todoDiv , entry.duedate , entry.checked,  ) ; 
    // <p class="list">List</p>
    //                     <p class="status">
    //                         <button >Edit</button>
    //                     </p>
    //                     <p class="close"><i class='bx bx-comment-x'></i></p>




    }

    function handleSelect( ID, select ){
        alert(select.value )
        let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
        const ind = todoArr.findIndex( ele => ele._id === ID ) ;
        if( ind === -1 ){
            alert("Some error ocurred ") ;
            
            return ; 
        }
        // todoArr.splice( ind , 1 ) ;
        todoArr[ind].category = select.value  
        localStorage.setItem("todoArr" , JSON.stringify(todoArr))
    
        
    }
    function checkDueDate( todoDiv , dueDate , checked  ){
        const date = new Date()  ; 
        const currYear = date.getFullYear() ; 
        const currMonth = date.getMonth() ; 
        const currDay = date.getDate() ; 
        // alert(`${year}  ${month}  ${day}`) ; 
    
        const duedate = new Date(dueDate)
        const year = duedate.getFullYear() ; 
        const month = duedate.getMonth() ; 
        const day = duedate.getDate() ; 
        // alert(`${year}  ${month}  ${day}`) ;
    
        let red = false ; 
        if( !checked ){
           if( duedate > date ){
            red = true  ;
           }
        }
        todoDiv.style.color = 'red' ;
       
    
    }

    function handleCheckBox( checkbox , todoDiv , divID, dueDate ){
        const date = new Date()  ; 
        const duedate = new Date(dueDate) ; 


        let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
        if( !todoArr){
            const temp = [] ; 
            localStorage.setItem("todoArr" , JSON.stringify(temp)) ; 
        }
        // todoArr = JSON.parse(localStorage.getItem("todoArr") );
        const ind  = todoArr.findIndex( ele => ele._id === divID ) ;
        if( ind === -1 ) {
            alert("Error ocurred ") ; 
            return ; 
        } 
        // alert( typeof todoArr[ind].checked);
        if( checkbox.checked ){
            todoDiv.style["text-decoration"] = "line-through" ;
            todoArr[ind].checked = true ; 
            todoDiv.style.color = 'black' ;

        }else{
            todoDiv.style["text-decoration"] = "none" ;
            todoArr[ind].checked = false ; 
            if( duedate < date){
                todoDiv.style.color = 'red' ;
            }
            
        }
        localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ;
        // checkDueDate(todoDiv, duedate ,  )
    }
    
    function insertAtProperIndex(todoDiv , obj ){

        // A KIND OF INSERTION SORT IS USED HERE 
        let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
        if( !todoArr){
            const temp = [] ; 
            localStorage.setItem("todoArr" , JSON.stringify(temp)) ; 
        }
        todoArr = JSON.parse(localStorage.getItem("todoArr") );


        const taskBody =  document.querySelector("#taskBody") ; 
        const childArr = taskBody.children ; 
        if( childArr.length === 0 ){
            taskBody.append( todoDiv ) ; 
            todoArr.push( obj ) ; 
            localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
            return ; 
        }
        let ind = -1 , len = childArr;
        for( let i = 0 ; i < childArr.length ; i++){
             
            const node = childArr[i] ;  
            const nodeChildren = node.children  ; 
            console.log("node" , node ) ; 
            console.log( "nodeChildre" , nodeChildren )
            if( Number(nodeChildren[1].textContent)  < Number(obj.priority)){
                ind = i ; 
                break ; 
            }
        }
        if( ind === -1 ){
            taskBody.append( todoDiv ) ; 
            todoArr.push( obj ) ; 
            localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
            return ; 
        }
        childArr[ind].insertAdjacentElement( 'beforebegin' , todoDiv) ; 
        todoArr.splice(ind , 0 , obj ) ;
        localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
    
         
        
    }

    function deleteToDo( tempID , todoDiv){
    const ans = confirm("Are you sure you want to delete?") ; 
    if(!ans) return ; 
    let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    if( !todoArr){
        alert("Sone error occurred!!") ; 
        return ; 
    }
    const ind = todoArr.findIndex( ele => ele._id === tempID ) ;
    // alert( ind ) ; 
    todoArr.splice( ind  , 1 ) ; 
    localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
    todoDiv.remove() ; 
    todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    alert( "Deleted successfully"  )
}

function editChanges( tempID , p1 , p2, p3 , todoDiv ){
//  todoTask = p1  ; 
//  todoPriority = p2 ; 
//  todoDue = p3 ;
 editID = tempID  ;
 toDoDiv =  todoDiv ; 
//  alert("p1p2p3")
 document.querySelector("#input1").value =  p1.textContent ; 
 document.querySelector("#input2").value =  p2.textContent ; 
 document.querySelector("#input3").value =  p3.textContent ; 


 document.querySelector("#add").textContent = "SAVE CHANGES" ;
 
}
function sevaChanges(){

    toDoDiv.remove() ; 
    let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    const ind = todoArr.findIndex( ele => ele._id === editID ) ;
    if( ind === -1 ){
        alert("Some error ocurred ") ;
        todop = null ; 
        editID = null ; 
        // document.querySelector("#container1 input").value = ""; 
        return ; 
    }
    todoArr.splice( ind , 1 ) ; 
    localStorage.setItem("todoArr" , JSON.stringify(todoArr))
    saveEntry() ; 
    // todoTask = null; todoPriority=null; todoDue = null;  ; 
     editID = null ; 
     toDoDiv = null ; 


    return ; 
    
// const editedVal1 = document.querySelector("#input1").value ; 
// const editedVal2 = document.querySelector("#input2").value ; 
// const editedVal3 = document.querySelector("#input3").value ; 

//     let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
//     if( !todoArr){
//         alert("Sone error occurred!!") ; 
//         return ; 
//     }
//     const ind = todoArr.findIndex( ele => ele._id === editID ) ;
//     if( ind === -1 ){
//         alert("Some error ocurred ") ;
//         todop = null ; 
//         editID = null ; 
//         document.querySelector("#container1 input").value = ""; 
//         return ; 
//     }
//     todoArr[ind].entry = editedVal1  ; 
//     todoArr[ind].priority = editedVal2 ; 
//     todoArr[ind].duedate = editedVal3 ;

//     localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
//     todoTask.textContent = editedVal1  ;
//     todoPriority.textContent = editedVal2  ;
//     todoDue.textContent = editedVal3  ;
//     alert( " Changes were successfully saved ") ; 
//     todop = null ; 
//     editId = null ; 
//     document.querySelector("#container1 input").value = ""; 

}

