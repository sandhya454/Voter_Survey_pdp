import Cookies from "js-cookie";
import apiService from "./api";
const VotersService={
    getVoters:async(BoothNo)=>{
       try{
        const response=await apiService.get(`Voters/${BoothNo}`,)
       
        
        return response

       }
       catch(error){
        console.error('error in fetching booths')
       }

    },
    getWardVoters:async(WardNo)=>{
      try{
       const response=await apiService.get(`Wards-Voters/?ward=${WardNo}`,)
       
       return response

      }
      catch(error){
       console.error('error in fetching booths')
      }

   },
   getAreaVoters:async(Area,BoothNo)=>{
      try{
       const response=await apiService.get(`Area-Voters/?area=${Area}&booth=${BoothNo}`)
       
       return response

      }
      catch(error){
       console.error('error in fetching Votes by area')
      }

   },
    getVoterDetails:async(VoterId)=>{
        try{
         const response=await apiService.get(`get-voter-details/?voter_id=${VoterId}`,)
         return response
 
        }
        catch(error){
         console.error('error in fetching booths')
        }
 
     },
     getMembers:async(HouseNo,BoothNo)=>{
        try{
         
         const response=await apiService.post(`members`,{house:HouseNo,booth:BoothNo})
         return response
 
        }
        catch(error){
         console.error('error in fetching booths')
        }
 
     },
     submitSurvey:async(selectedMembers,surveyData)=>{
     
        try{
         const response=await apiService.post('submit-survey-all',{selectedMembers,surveyData})
         return response
 
        }
        catch(error){
         console.error('error in submitting survey data',error)
        }
 
     }

};


export default VotersService;