import React, { useEffect, useState } from 'react'
import { readSingleStudent } from '../service/StudentService'

const SingleStudent = () => {
    const [student,setStudent] = useState({})

    const readStudents=async()=>{
        const response = await readSingleStudent(1);
        setStudent(response)
        console.log(response);
    }
  
    useEffect(()=>{
        readStudents();
    },[])
  
    return (
    <div>SingleStudent</div>
    )

}

export default SingleStudent