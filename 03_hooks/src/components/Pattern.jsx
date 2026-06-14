import React from 'react'

const Pattern = () => {

    let count =6;

    const print=()=>{
        
        for(let i=0;i<count;i++){
            for(let j=0;j<i;j++){
                console.log("*");
            }
            console.log("\n")
        }
    }
  return (
    <div>

    <button onClick={print}>Print Pattern</button>

    </div>
  )
}

export default Pattern