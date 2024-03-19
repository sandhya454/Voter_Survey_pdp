import apiService from "./api";
const BoothService={
    getBooths:async()=>{
       try{
        const response=await apiService.get('Booths')
        return response

       }
       catch(error){
        console.error('error in fetching booths')
       }

    }

};

export default BoothService;