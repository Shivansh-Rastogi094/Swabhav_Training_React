import axios from 'axios'
import api from '../api/api';

export const readStudents=async()=>{

try{
const response =await api.get(`/students`,{
   auth: {
         username: "admin",
         password: "admin123"
        }
    });
return response.data;
}catch(err){
    console.log(err);
    
}

}