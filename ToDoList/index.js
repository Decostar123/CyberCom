
let todop = null  ; 
let editID = null ; 
document.addEventListener('DOMContentLoaded' , ()=>{
    let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    if( !todoArr){
        const temp = [] ; 
        localStorage.setItem("todoArr" , JSON.stringify(temp)) ; 
    }
    todoArr = JSON.parse(localStorage.getItem("todoArr") );
    for( entry of todoArr ){
        const todoDiv = document.createElement("div") ; 
        todoDiv.classList.add("todoTask") ;
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const btn = document.createElement("button") ;
        const icon = document.createElement("i");
        p1.classList.add("list") ; 
        p1.textContent = entry.val ; 
        
        p2.classList.add("status") ; 
        btn.textContent = "Edit" ; 
        p2.append( btn ) ; 

        p3.classList.add("close") ; 
        icon.classList.add("bx") ; 
        icon.classList.add("bx-comment-x") ; 
        p3.append(icon) ; 

        todoDiv.id = entry._id ; 
        todoDiv.append(p1) ; 
        todoDiv.append(p2) ;
        todoDiv.append(p3) ; 
        
        document.querySelector("#taskBody").append(todoDiv );

        icon.addEventListener('click' , ()=>{
            deleteToDo( entry._id , todoDiv  ) ; 
         })

        btn.addEventListener('click' , ()=>{
            editChanges( entry._id, p1 ) ;
        })
        
    }

}) ; 

document.querySelector("#add").addEventListener( "click" , ()=>{
if( editID ){
    sevaChanges() ; 
    return ; 
}
const val = document.querySelector("#container1 input").value ; 
if( !val){
    alert("Please Enter TODO Task !!") ; 
    return;
}
let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
if( !todoArr){
    const temp = [] ; 
    localStorage.setItem("todoArr" , JSON.stringify(temp)) ; 
}
todoArr = JSON.parse(localStorage.getItem("todoArr") );
// console.log( todoArr ) ; 
const tempID = "" + Date.now() ; 
const obj = { "val" : val , _id : tempID } ;
const todoDiv = document.createElement("div") ; 
todoDiv.classList.add("todoTask") ;
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const btn = document.createElement("button") ;
const icon = document.createElement("i")
// console.log(todoDiv, p1,p2,p3 ) ; 

p1.classList.add("list") ; 
p1.textContent = val ; 

p2.classList.add("status") ; 
btn.textContent = "Edit" ; 
p2.append( btn ) ; 

p3.classList.add("close") ; 
icon.classList.add("bx") ; 
icon.classList.add("bx-comment-x") ; 
p3.append(icon) ; 

todoDiv.id = tempID ; 
todoDiv.append(p1) ; 
todoDiv.append(p2) ;
todoDiv.append(p3) ; 

todoArr.push( obj ) ; 

localStorage.setItem("todoArr" , JSON.stringify(todoArr)) ; 
document.querySelector("#taskBody").append(todoDiv )


icon.addEventListener('click' , ()=>{
    deleteToDo( tempID , todoDiv  ) ; 
})

btn.addEventListener('click' , ()=>{
editChanges( tempID, p1 ) ;
})
// <p class="list">List</p>
//                     <p class="status">
//                         <button >Edit</button>
//                     </p>
//                     <p class="close"><i class='bx bx-comment-x'></i></p>

})

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

function editChanges( tempID , p1 ){
 todop = p1  ; 
 editID = tempID  ;
 document.querySelector("#container1 input").value =  p1.textContent ; 
 document.querySelector("#add").textContent = "SAVE CHANGES" ;
 
}
function sevaChanges(){
const editedVal = document.querySelector("#container1 input").value ; 
    let todoArr = JSON.parse(localStorage.getItem("todoArr") ); 
    if( !todoArr){
        alert("Sone error occurred!!") ; 
        return ; 
    }
    const ind = todoArr.findIndex( ele => ele._id === editID ) ;
    if( ind === -1 ){
        alert("Some error ocurred ") ;
        todop = null ; 
        editId = null ; 
        document.querySelector("#container1 input").value = ""; 
        return ; 
    }
    todoArr[ind].val = editedVal  ; 
    todop.textContent = editedVal  ;
    alert( " Changes were successfully saved ") ; 
    todop = null ; 
    editId = null ; 
    document.querySelector("#container1 input").value = ""; 

}

