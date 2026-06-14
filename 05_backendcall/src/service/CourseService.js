import axios from 'axios'
import api from '../api/api';

export const readCourseById=async(id)=>{

try{
const response =await api.get(`/courses/${id}`,{
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