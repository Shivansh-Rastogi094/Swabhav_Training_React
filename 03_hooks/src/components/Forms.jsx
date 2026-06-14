import React, { useRef, useState } from 'react'

const Forms = () => {
    const[name,setName]=useState("");
    const [message, setMessage] = useState("");
    const city =useRef("")

    const handleSubmit = () => {
        setMessage( `Hello ${name}`);
    };
    const handleCity=()=>{
        console.log(`from ${city.current.value}`)
    }
  return (
    <div>
        <input onChange={(event)=>{
            event.preventDefault();
            setName(event.target.value)
        }} type="text" placeholder='Your Name'/>
        <button onClick={handleSubmit}>Click me</button><br />
        {message}
        <br />
        <input type="text" placeholder='City' ref={city}/><br />
        <button onClick={handleCity}>Click me and check console</button>
        
    </div>
  )
}

export default Forms