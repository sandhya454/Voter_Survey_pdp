import apiService from "./api";
import Cookies from "js-cookie";
const AuthService={
    ValidateLogin:async(loginDetails)=>{
       try{
        const response=await apiService.post("validates-login",loginDetails)
        if(response.status==="success"){
            const token=response.token
            Cookies.set('jwtToken',token)
            return true
        }
        else{
            return false
        }
        


       }
       catch(error){
        console.error('error in Validating Login',error)
       }

    },
    getUserDetails:async(token)=>{
        console.log(token,'token')

        try{
            const response = await apiService.post("User-Details",{token:token.token,payload:"test"})
            console.log(JSON.parse(response),'response at service')
            
        
         
 
 
        }
        catch(error){
         console.error('error in getting user details',error)
        }
 
     }


};

export default AuthService;