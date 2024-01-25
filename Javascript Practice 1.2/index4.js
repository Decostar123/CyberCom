function modifyObject( obj ){
    if( obj.address ){
        delete obj.address  ;
    }
    console.log( obj ) ;
    
}

const obj  = { name : "Deco" , age : 22 , address : "India"} ; 
modifyObject( obj ) ;
console.log( obj ) ;  