import React, { useState } from 'react'

const Demo = () => {
    const[count,setCount] =useState(10);
    const increase=(event)=>{
        event.preventDefault();
        setCount(count+1)
        // console.log(count); 
    }
  return (
    <form >
    <div>
        <p>{count}</p>
        <button onClick={increase}>Increment</button>
    </div>
    </form>
  )
}

export default Demo