document.addEventListener('DOMContentLoaded', () => { 
        
    let adminEntry = localStorage.getItem("adminDetails") ; 
    // userName: "Deco3", mail: "", pass: "", confirmPass: "", city: "", state: ""}
   adminEntry = JSON.parse(adminEntry) ;
//    alert(adminEntry.isAdmin) ; 
let isAdmin = localStorage.getItem("isAdmin") ; 
alert( `${isAdmin} ${typeof(isAdmin)}`)
   document.querySelector("#user").style.visibility = isAdmin === "true"  ?"visible":"hidden" ; 
    document.querySelector("#adminName").textContent = adminEntry.userName ;
    let small = 0 , medium = 0 , large = 0 ; 
    let arr  = localStorage.getItem("inputForm" ) ; 
    if( arr === null ) {
        const temp = [] ; 
        localStorage.setItem( "inputForm" , JSON.stringify( temp ));
    }
    arr  = localStorage.getItem("inputForm" ) ; 
    arr = JSON.parse( arr) ;
    console.log("arr" , arr )
    for( entry of arr ){
        // if( en try.age )
        console.log( entry.age )
        const num = Number(entry.age) ; 
        if( num <= 18 ) small++;
        else if( num <= 50 ) medium++;
        else large++ ;
        console.log("the num" , num ) ; 
    }
    document.querySelector("#small").textContent = small ; 
    document.querySelector("#medium").textContent = medium ; 
    document.querySelector("#large").textContent = large ; 
    
    const temp = new Date() ; 
    const a = Number( temp.getMonth()) ; 
    const b = Number( temp.getDate()) ; 
    for( entry of arr ){
        // if( en try.age )
        const ttemp = new Date( entry.birthdate  ) ; 
        const aa = Number( ttemp.getMonth()) ;
        const bb = Number( ttemp.getDate()) ;  
        if( aa === a && bb === b){
            const text = document.createElement( "p" ) ;
            text.textContent = `Today is ${entry.userName} birthday`;
            text.classList.add("birthday")
            document.querySelector("#right").append( text ) ;  
        }
        console.log( a,aa,b,bb)
    }

} )
document.querySelector("#user").addEventListener( 'click' , ()=>{
    window.location.href="Users.html"
})
