import api from "../api/api";

const token ="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBpbnN1cmFuY2UuY29tIiwiaWF0IjoxNzgxNTIwODA5LCJleHAiOjE3ODE2MDcyMDl9.7WUm5LNezSIWmRWinvO4bwfWE74hr2Z4cyl41MrcH6Uzt2LB2gywklEg0m4E-o2k";

export const readAllProducts=async()=>{
    try{
        
        const response = await api.get(`products`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response
    }
    catch(err){
        console.log(err);
    }
}