function combineObjects( obj1 , obj2 ){
    const obj  = {...obj1 , ...obj2 } ; 
    return obj  ;
}
const obj1 = { name :   "Deco" , age : 22 } ; 
const obj2 = { address : "India" } ;
const obj=   combineObjects( obj1 , obj2 ) ; 
console.log( obj ) ; 