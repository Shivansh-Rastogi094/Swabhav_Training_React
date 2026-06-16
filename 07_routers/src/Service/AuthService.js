import api from "../Api/api"

export const LoginService=async(user)=>{
    try {         
        console.log("Function Started");
        
        const response = await api.post(`auth/login`,user)
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}
