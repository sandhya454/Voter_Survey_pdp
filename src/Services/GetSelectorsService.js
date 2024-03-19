import apiService from "./api";

const SelectorsService={
    getCatses:async()=>{
       try{

            const response=await apiService.get('get-selectors/castes')
            return response

       }
       catch(error){
        console.error('error in fetching Castes')
       }

    },
    getProblems:async()=>{
        try{
 
             const response=await apiService.get('get-selectors/problems')
             return response
 
        }
        catch(error){
         console.error('error in fetching Problems')
        }
 
     },
     getRemarks:async()=>{
        try{
 
             const response=await apiService.get('get-selectors/remarks')
             return response
 
        }
        catch(error){
         console.error('error in fetching Problems')
        }
 
     }

};

export default SelectorsService;