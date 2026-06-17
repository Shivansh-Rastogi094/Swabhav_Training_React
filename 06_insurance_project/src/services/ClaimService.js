import api from "../api/api";

export const token ="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBpbnN1cmFuY2UuY29tIiwiaWF0IjoxNzgxNTk4NTMzLCJleHAiOjE3ODE2ODQ5MzN9.VfRV1ctkmIMIHyeuAb6cGgWrwTVbnOR0li3jI4GiFy06eUVq0F5Di7nFHEXdd3-q";

export const readAllClaims=async()=>{
    try{

        const response = await api.get(`claims`,{
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

export const readMyClaims = async()=>{
    try {
        const respone = await api.get(`claims/my`)
        return respone.data;
    } catch (error) {
        console.log(error);
        
    }
}