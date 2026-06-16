import React from 'react'
import { useNavigate } from 'react-router-dom'

const New = () => {
  const navigate = useNavigate();
    return (
    <>
    <div>New</div>
    <button onClick={()=>{navigate(-1)}}>back</button>
    </>
  )
}

export default New