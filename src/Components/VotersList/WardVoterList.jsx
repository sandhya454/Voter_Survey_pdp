import React from 'react'
import './VoterList.css'
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import VotersService from '../../Services/GetVotersService';
import { useSelector,useDispatch } from 'react-redux';
import { addVoterList,selectVoterList } from '../../Store/slice';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
function WardsVoterList() {
  const navigate=useNavigate()
  const Surveyer=Cookies.get('Surveyer')
  const dispatch=useDispatch()
  
  
  const Voters=useSelector(selectVoterList)
  const {WardNo}=useParams()
  //const [Voters,setVoters]=useState([])
  const [TotalVoters,setTotalVoters]=useState([]);
  const [searchTerms,setSearchTerms]=useState(null);
  const [spinning, setSpinning] = useState(false);
  const [BgT,setBgT]=useState(false)
  const [BgS,setBgS]=useState(false)


  const showLoader = () => {

    setSpinning(true);

    setTimeout(() => {

      setSpinning(false);

    }, 5000);

  };

  const getVotersList=async()=>{
    showLoader()
    
    try{
      const response=await VotersService.getWardVoters(WardNo)
    
     
      await dispatch(addVoterList(response))
    }
    catch(error){

      console.error('error in fetching voter list from Voter Service')
    }
  }
  const debouncedSearch = (terms) => {

    if (terms === null) {
      setTotalVoters(Voters.slice(0, 200));
    } else {
      const filteredVoters = Voters.filter(
        (voter) =>
          voter.Name.toLowerCase().includes(terms.toLowerCase()) ||
          voter.Epic.toLowerCase().includes(terms.toLowerCase()) ||
          voter.House_Number.toLowerCase().includes(terms.toLowerCase())
      );
      setTotalVoters(filteredVoters);
    }
  }; 

  
  useEffect(()=>{  
    getVotersList()
  },[dispatch])
  


  const goBack=()=>{
    navigate(-1)
  }
  const updateSurveyStatus=async(Voter)=>{
    const selectedMembers=[Voter]
    const surveyData={Surveyer:Surveyer}


  
      try{
        
        const response=await VotersService.submitSurvey(selectedMembers,surveyData);

      }
      catch(error){
        console.error(error,'error in submitting availabilty status')
      }
}
  const goToSurvey=(VoterId,surveyer)=>{
    if(surveyer==="" || Surveyer===surveyer ||Surveyer==="Ramki" || Surveyer==="Manikanta" ){
      updateSurveyStatus(VoterId)
       navigate(`voter-survey/${VoterId}`)
    }
    else{
      toast.error(`No Permission only ${surveyer} can access this.` )
    }
  }
  const getSurveyedVoters=()=>{
    setTotalVoters(Voters.filter((voter)=>voter.Survey===1))
    setBgS(true)
    setBgT(false)
    console.log(TotalVoters.length)
  }
  const getTotalVoters=()=>{
    setTotalVoters(Voters.filter((voter)=>voter.Survey!=1))

    setBgT(true)
    setBgS(false)

  }
 
   
      
     
    
    
  return (
    
    <div className='VoterListMainCont'>
      <ToastContainer/>
     
     
        <div className='VoterHeaderCont'>
         <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack}/>
         <div>Ward NO : {WardNo}</div>
         <div>Total : {Voters.length}</div>
        </div>
        <div className='VoterListCont'>
          <div className='VoterListAFS'>
              <div className='AllocatedFinishedCont'>
                          <div className = 'AllocatedCont' onClick={getTotalVoters} style={{backgroundColor:BgT===true?'green':''}}>
                              <div className='AllocatedBooths'>{Voters.filter((voter)=>voter.Survey!=1).length}</div>
                              <div className='AllocatedText'>Pending</div>
                          </div>
                          <div className='FinishedCont' onClick={getSurveyedVoters} style={{backgroundColor:BgS===true?'green':''}}>
                              <div className='FinishedBooth'>{Voters.filter((voter)=>voter.Survey===1).length}</div>
                              <div className='AllocatedText'>Surveyed</div>
                          </div>
              </div>
              <div className='SearchCont'>
                <input type='search' placeholder='Search By Voter Id or Name' className='VoterSearchInput' onChange={(e)=>{setSearchTerms(e.target.value)}}/>
                <div className='SearchBtn' onClick={()=>{debouncedSearch(searchTerms)}}>Search</div>
              </div>
            </div>
        
            <div className='VoterList'>
              {TotalVoters.length>=1?
                TotalVoters.map((voter)=>(

                  <div className='VoterCard' onClick={()=>{goToSurvey(voter.Epic,voter.Surveyer)}} style={voter.Survey===1?{background: 'linear-gradient(90deg, rgba(255,255,255,1) 94%, rgba(0,255,8,0.978203781512605) 94%)'}:{background:'linear-gradient(90deg, rgba(255,255,255,1) 96%, rgba(0,1,152,0.978203781512605) 96%)'}}>

                    <div className='VoterSnoCont'>
                        <div className='VoterId'><strong>Id : </strong>{voter.Epic}</div>
                        <div className='SNO'><strong>S NO : </strong>{voter.Voter_S_no}</div>
                    </div>
                   
                     
                    
                    <div className='VoterName'><strong>Name : </strong>{voter.Name}</div>
                    <div className='VoterFName'><strong>Relative : </strong>{voter.Father_Name}</div>
                    <div className='VoterAgeCont'>

                      <div><strong>Age : </strong>{voter.Age}</div>
                      <div><strong>Gender : </strong>{voter.Gender}</div>
                      
                      
                    </div>
                    
                    <div><strong>H NO : </strong>{voter.House_Number}</div>
                    <div className='surveyer'>{voter.Surveyer.split(' ')[0]}</div>
                   
                  </div>
                )): <Spin spinning={spinning} fullscreen/>
                
              }
                

            </div>

        </div>


    </div>
    
  )
}

export default WardsVoterList