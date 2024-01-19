
document.querySelector("textarea").addEventListener('keydown' , (e)=>{
            
    if( e.code === 'Enter'){
        e.preventDefault()
        document.querySelector("#left-s").style.display="block" ; 
       setTimeout(()=>{
        document.querySelector("#right-s").style.display="block" ;
       },2000)
    }
})
setTimeout(()=>{
    document.querySelector("#right-f").style.display="block" ;
    

}, 3000 ) ; 
document.querySelector("#Yes").addEventListener( 'click' , ()=>{
 window.location="portfolio.html"
})
document.querySelector("#No").addEventListener( 'click' , ()=>{
 document.querySelector("#left-t").style.display="block" ;
})
