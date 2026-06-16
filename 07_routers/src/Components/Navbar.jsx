import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
        <Link to={ {pathname: "/home"}}>Home</Link>
        <Link to={ {pathname: "/aboutus"}}>About Us</Link>
        <Link to={ {pathname: "/profile"}}>Profile</Link>
        
    </div>
  )
}

export default Navbar