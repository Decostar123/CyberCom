import React from 'react'
import navbar from "@/css/navbar.module.css" ; 
import Image from 'next/image';
import Link from 'next/link';
import Profile from './Profile';

const Navbar = () => {
  return (
    <div className={navbar.container}>
       <div className={navbar.firstDiv}>
       <Link href="/">
        <Image src="https://seeklogo.com/images/R/redbus-logo-13648C0E43-seeklogo.com.png" alt='Red Bus Image' width="90" height="60"></Image>
        </Link>
        <p className={navbar.bookText}>Book, Your Buses</p>
       </div>
       <Profile />
      
           
    </div>
  )
}

export default Navbar