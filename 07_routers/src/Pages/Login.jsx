import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate= useNavigate();

  const handleLogin=()=>{

    
  }
  
  const email="admin@insurance.com";
  const password = "Admin@1234";

  const user={email,password};
  return (
    <div><button onClick={()=>{handleLogin}}>Login</button></div>
  )
}

export default Login