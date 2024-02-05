
       
        document.addEventListener('DOMContentLoaded', () => { 


            document.querySelector("#register").addEventListener( 'click' ,(e)=> {

            e.preventDefault() ; 
            alert("clicked"); 
            window.location.href = "Registeration.html"; 
                
            // window.open("http://127.0.0.1:5500/Task/Registeration.html" , "_self")
            })
        let adminEntry = localStorage.getItem("adminDetails") ; 
        // userName: "Deco3", mail: "", pass: "", confirmPass: "", city: "", state: ""}
    //    adminEntry = JSON.parse(adminEntry) ;
    //     document.querySelector("#adminName").textContent = adminEntry.userName ;
            if( adminEntry ){
                document.querySelector("#register").style.display = "none"
                document.querySelector("#or").style.display = "none"
            }else{
                document.querySelector("#register").style.display = "block"; 
                document.querySelector("#register").style.display = "block";
                return ;  
            }
            
    } )
    document.querySelector("#login").addEventListener( 'click' ,(e)=> {
            // alert("clicked");
            e.preventDefault() ; 
            const email  = document.querySelector("#mail").value ; 
            const pass = document.querySelector("#pass").value ; 
            alert(`${email} , ${pass}`)
            let adminObj = localStorage.getItem("adminDetails") ; 
            adminObj  = JSON.parse( adminObj) ; 
            // alert(`${adminObj.mail} , ${adminObj.pass}`)
            if( adminObj.mail=== email && adminObj.pass === pass ){
                localStorage.setItem("isAdmin" , true ) ; 

                alert("done");
                // window.location.href="http://127.0.0.1:5500/Task/Dashbord.html" ; 
            // window.location.href = "Dashbord.html"
            window.location.href = "Dashbord.html"
            //    window.open("http://127.0.0.1:5500/Task/Dashbord.html" , "_self")
            }else{
                localStorage.setItem("isAdmin" , false ) ;
                let signInUsers = localStorage.getItem("inputForm")  ; 
                signInUsers = JSON.parse( signInUsers ) ; 
                alert( signInUsers ) ; 
                for( entry of signInUsers ){
                    let userEmail = entry.email ; 
                    let userPassword = entry.password     ; 
                    console.log(userEmail ,  userPassword)
                    if(userEmail === email && userPassword === pass  ){
                        window.location.href = "Dashbord.html"
                    }
                }
                console.log( "signInUsers" , signInUsers ) ; 

                alert("Invalid Credentials");
            }
            
        }) ; 

    