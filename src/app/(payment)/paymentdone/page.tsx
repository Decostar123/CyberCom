'use client' ; 
import React , { useEffect , useState } from 'react'
import payment from "./css/payment.module.css" ; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UserDetails = {
    [key : string ] : any
  };
const page = () => {
    const [ userDetails , setUserDeatils] = useState<UserDetails>([]) ; 
    const [fromCity , setFromCity ] = useState("") ; 
    const [toCity , setToCity ] = useState("") ; 
    const [fromTime ,  setFromTime] = useState("") ; 
    const [toTime ,  setToTime] = useState("") ; 
    useEffect(()=>{
        let usersBooked : any  = localStorage.getItem("usersBooked") ; 
        usersBooked = JSON.parse( usersBooked) ; 
        setUserDeatils( usersBooked  ) ; 

        let city : any = localStorage.getItem("fromCity") ; 
        if( !city )  city = "" ; 
        setFromCity( city )  ; 

        city = localStorage.getItem("toCity")  ; 
        if( !city) city = "" ; 
        setToCity( city ) ;
        getTimings()  ;  
        // toast.success("Booking Done. Ticket Deatils Sent to Regesitered mail ") ; 

    }  , [] ) ; 
    
    function getTimings(){
        let time : any = localStorage.getItem("fromTime") ; 
        setFromTime( time )  ; 
        time =localStorage.getItem("toTime") ; 
        setToTime( time ) ; 

    }
    function getProperDate(inputDate: any ){
        const date : any = new Date(inputDate);

        // Check if the date is valid
        if (isNaN(date)) {
         return "" ; 
        }
      
        // Define the formatting options
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
      
        // Format the date
        const formattedDate = date.toLocaleDateString('en-US', options);
      
        return formattedDate;
    }

    function getToatalFarePrice( routeID : any , busID : any  ){

        let seatPrice : any  = getPrice(  routeID ,busID,  true ) ; 
        let sleepPrice :  any =  getPrice( routeID , busID  , false  ) ; 
        if( !seatPrice || !sleepPrice ) return ; 

        seatPrice = Number(seatPrice) ; 
        sleepPrice = Number(sleepPrice) ; 
            let money : any = userDetails.reduce(( acc : any , ele : any ) =>{
            if( ele.seatType === 'SLEPPER'){
                acc+= seatPrice ;
            }else{
                acc += sleepPrice ; 
            }
            return acc ;
    } , 0  )  ;
        return money ;
    }

  function getRouteCity( routeID : any ,  fromBoolean : any ){

    let route : any = localStorage.getItem( "route" ) ; 
    if( !route ) return "" ; 
    route = JSON.parse( route ) ; 
    let ind : any  = route.findIndex( ( ele : any ) => Number(ele.id) === Number(routeID)) ;
    console.log( " getRouteCity" , ind , routeID   )

    if( ind === -1 ) return "" ; 
    
    let cityID  = fromBoolean ? route[ind].fromCityID : route[ind].toCityID  ; 

    return getCityName( cityID )  ;
  }
    function getCityName( cityID : any ){
        let city : any = localStorage.getItem("city") ; 
        if( !city ){
            city = []   ; 
            localStorage.setItem("city" , JSON.stringify(city )) ; 
        }
        city = localStorage.getItem("city") ; 
        city  = JSON.parse( city ) ; 
        let ind  : any = city.findIndex(( ele : any ) => ("" +ele.id) === ("" + cityID)  ) ; 

        console.log( " getCityName" , ind  )
        if( ind === -1 ) return "" ; 
        return city[ind].name ; 
    }

    function getRouteTime( routeID : any , busID : any , fromBoolean : any ){
        let availableBuses : any = localStorage.getItem("availableBuses") ; 
        if( !availableBuses) return "" ; 

        availableBuses = JSON.parse( availableBuses )  ; 
        let ind : any = availableBuses.findIndex( ( ele : any ) => Number( ele.routeID) === Number(routeID) && Number(ele.busID) === Number( busID )) ; 
        if( ind === -1 ) return "" ; 
        let time : any = fromBoolean ? availableBuses[ind].fromTime : availableBuses[ind].toTime ; 
        return time ; 
    }

    function getPrice( routeID : any , busID : any  , seating : any ){
        let availableBuses : any = localStorage.getItem("availableBuses") ; 
        if( !availableBuses) return 0 ; 

        availableBuses = JSON.parse( availableBuses )  ; 
        let ind : any = availableBuses.findIndex( ( ele : any ) => Number( ele.routeID) === Number(routeID) && Number(ele.busID) === Number( busID )) ; 
        if( ind === -1 ) return 0  ; 

        let price : any = seating  ? Number(availableBuses[ind].seatingPrice) : Number( availableBuses[ind].sleeperPrice) ; 
        return price; 
    }



    if( userDetails.length === 0 ) return <></>
  return (
    <div className={payment.outer}>
        <ToastContainer/>
        
        <div  className={payment.inner}>
            <p className={payment.left}>Date</p>
            <p className={payment.right}>{getProperDate( userDetails[0]?.date)}</p>
            <p className={payment.left}>Ticket Number</p>
            <p className={payment.right}>{userDetails[0]?.ticketID}</p>

            <p className={payment.left}>Bus Number</p>
            <p className={payment.right}>{userDetails[0].busID}</p>

            <p className={payment.left}>From</p>
            <p className={payment.right}>{getRouteCity( userDetails[0].routeID , true )} , {getRouteTime(  userDetails[0].routeID , userDetails[0].busID , true)} </p>
            <p className={payment.left}>To</p>
            <p className={payment.right}>{getRouteCity( userDetails[0].routeID , false  )} , {getRouteTime(  userDetails[0].routeID , userDetails[0].busID , false)} </p>

            <p className={payment.left}>Total Seats</p>
            <p className={payment.right}>{userDetails.length}</p>

            {
                userDetails.map(( ele : any )=>{
                    return <>
                      <p className={payment.left}>{ 
                      ele.name.split(" ").reduce(( acc : any , val : any )=>{ 
                        return acc +  val.charAt(0).toUpperCase() + ""  + val.slice(1).toLowerCase() + " "
                      } , "" ) 
                      
                      }</p>
                    <p className={payment.right}>{ele.seatType}, {ele.seatNo} </p>
                    </>
                })
            }
          
            <p className={payment.left}>Total Fare</p>
            <p className={payment.right}>{getToatalFarePrice( userDetails[0].routeID , userDetails[0].busID )}</p>

           
        </div>    
       <div className={payment.download}>
       <button>Download Ticket</button>
       </div>
     </div>
  )
}

export default page