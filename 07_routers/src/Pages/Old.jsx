import React from 'react'
import { useNavigate } from 'react-router-dom';

const Old = () => {
  const navigate = useNavigate();
      return (
      <>
      <div>Old</div>
      <button onClick={()=>{navigate(-1)}}>back</button>
      </>
    )
}

export default Old