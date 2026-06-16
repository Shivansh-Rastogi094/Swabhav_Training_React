import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AboutUs = () => {
  
  const navigate = useNavigate()
  return (
    <>
    <div>AboutUs</div>
    <button onClick={()=>{navigate('/home')}}>To Home</button>
    <button onClick={()=>{navigate('/aboutus/old')}}>To Old</button>
    <button onClick={()=>{navigate('/aboutus/new')}}>To New</button>
    <Outlet></Outlet>
    </>
  )
}

export default AboutUs