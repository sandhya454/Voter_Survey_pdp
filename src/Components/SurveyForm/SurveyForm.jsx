import React, { useEffect, useState } from 'react';
import './SurveyForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react';
import {Select,Input, Spin,Radio} from 'antd';
import SelectorsService from '../../Services/GetSelectorsService';
import VotersService from '../../Services/GetVotersService';
import { useDispatch,useSelector } from 'react-redux';
import { addSelectedMember, removeSelectedMember,selectSelectedMembers,resetSelectedMembers,addMembersVoterList ,selectAddMembersVoterList, addVoterList} from '../../Store/slice'
import Cookies from 'js-cookie';
import moment from 'moment-timezone';
import useLocation from '../../Services/GetGeoLocation';
import { add } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

function SurveyForm() {
    
    const currentDate=new Date()
    const survey_id=uuidv4()
    const apiKey = 'AIzaSyD3dRlhejixTZP72aNBTtXBRg_olo-bVxQ';
    const { location, error, getAddress } = useLocation();
    const [addMemebrs,setAddMembers]=useState(false)
    
    const addMembersList=useSelector(selectAddMembersVoterList)
    const [TotalAddVoters,setTotalAddVoters]=useState([])
    const [searchTerms,setSearchTerms]=useState(null)
   
    
    const navigate=useNavigate()
    const dispatch = useDispatch();

    const [No,setNo]=useState(0)
    const {BoothNo,WardNo,VoterId}=useParams();
    useEffect(()=>{
      if(BoothNo!=undefined){
        setNo(BoothNo)
      }
      else{
        setNo(WardNo)
      }
    },[])
    

    const [ShowForm,setShowForm]=useState(false);
    const surveyer=Cookies.get('Surveyer')
   
    
    const [MembersCount,setMembersCount]=useState('5');
    const [Castes,setCastes]=useState([]);
    const [Problems,setProblems]=useState([]);
    const [Remarks,setRemarks]=useState([]);

    const [Members,setMembers]=useState([]);
    //const [selectedMembers,setselectedMembers]=useState([]);
    const selectedMembers = useSelector(selectSelectedMembers);
    


    const [Mobile,setMobile]=useState(null);
    const [Color,setColor]=useState('white');
    const [Caste,setCaste]=useState(null);
    const [Location,setLocation]=useState(null);
    const [Name,setName]=useState(null)
    const [RName,setRName]=useState(null)
    const [HouseNo,setHouseNo]=useState(null)
    const [Problem,setProblem]=useState(null)
    const [Remark,setRemark]=useState(null)
    const [Age,setAge]=useState(null)
    const [Gender,setGender]=useState(null);
    const [Relation,setRealtion]=useState(null);
    const [Observation,setObservation]=useState(null);
    const [Availability,setAvailability]=useState('Local')
    const [Geo,setGeo]=useState('no address')
    const [Latitude,setLatitude]=useState(null)
    const [Longitude,setLongitude]=useState(null)
    const [Booth,setBooth]=useState(0)
  

    const getSeletors=async()=>{
      try{
        const castes= await SelectorsService.getCatses();
        const problems= await SelectorsService.getProblems();
        const remarks= await SelectorsService.getRemarks();

        
        const updatedCasteList =await  castes.map(caste => ({ ...caste, ['label']: caste.Value, ['value']: caste.Value }));
        const updatedProblemList =await  problems.map(problem => ({ ...problem, ['label']: problem.Value ,['value']: problem.Value }));
        const updatedRemarksList =await  remarks.map(remark => ({ ...remark, ['label']: remark.Value,['value']: remark.Value }));
        await setCastes(updatedCasteList)
        await setProblems(updatedProblemList)
        await setRemarks(updatedRemarksList)
        
      }
      catch(error){
        console.error('error in fetching',error)
      }
        
      

    }


    const getMembers=async()=>{
      try{
        console.log(HouseNo)
        
        const members=await VotersService.getMembers(HouseNo,Booth)
       
       
        
       
        setMembers(members)
       
        setMembersCount(members.length)
        
        
      }
      catch(error){
        console.error('error in fetching',error)
      }
      
      

    }

   






    const getVoterDetails=async()=>{
      try{
        const response=await VotersService.getVoterDetails(VoterId)
       
        setName(response[0].Name)
        setHouseNo(response[0].House_Number)
        setBooth(response[0].Booth)
        
      
        
        
        setAge(response[0].Age)
        setGender(response[0].Gender)
        setRName(response[0].Father_Name)
        if(response[0].Survey===1){
          setCaste(response[0].Caste)
          setColor(response[0].Color)
          setAvailability(response[0].Availability)
          setObservation(response[0].Observation)
          setMobile(response[0].Mobile)
          setLocation(response[0].Location)
          setProblem(response[0].Problems)
          setRemark(response[0].Remarks)
          
        }
        setRealtion('Relative')
       
        

      }
      catch(error){
        console.error(error,'error in fetching')
      }

    }

    
    

    const getAllVoters=async()=>{
      try{
       
        
        const response=await VotersService.getVoters(Booth)
       
       
        dispatch(addMembersVoterList(response))

      }
      catch(error){
        console.error(error,'error in fetching all voters')
      }

    }

    const goBack=()=>{
        navigate(-1)
        dispatch(resetSelectedMembers());
    }
    const clearSelectors=()=>{
      dispatch(resetSelectedMembers());
    }
    
   

  
  




   
   
  
   

    useEffect(()=>{
      getVoterDetails();
      getMembers()
      
      
      getSeletors(); 
      
      
    },[HouseNo])
    

    const handleSelectedMembers = (event, member) => {
      const { checked } = event.target;
      const memberName = member.Epic;
  
      if (checked) {
        dispatch(addSelectedMember(memberName));
      } else {
        dispatch(removeSelectedMember(memberName));
      }
      
    };


    const handleLocationChange = async (position) => {
      if (position && position.latitude && position.longitude) {
       
  
        try {
          const address = await getAddress(position.latitude, position.longitude);
          setLatitude(position.latitude)
          setLongitude(position.longitude)
         
          setGeo(address)
        } catch (error) {
          console.error('Error fetching address:', error.message);
        }
      } else {
        console.error('Invalid position object:', position);
      }
    };
    useEffect(() => {
      if (location) {
        handleLocationChange(location);
      
      }
    }, [location]);



    const submitSurvey=async()=>{
     
   
    
    
    const formattedDateTime = moment(currentDate).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    const survey_date=new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).toString()

    
  
      const surveyData={Mobile:Mobile,Caste:Caste,Color:Color,Problems:Problem,Remarks:Remark,Survey:1,Observation:Observation,Availability:Availability,Location:Location,Surveyer:surveyer,Surveyed_on:formattedDateTime,Geo:Geo,Latitude:Latitude,Longitude:Longitude,survey_id:survey_id,survey_date:survey_date}
      //const surveyData={Mobile_Number:Mobile}
      try{
        if(surveyer!=null){
        const response=await VotersService.submitSurvey(selectedMembers,surveyData);
       

        if(response.success==true){
           toast.success('Submitted Survey Successfully');
           setTimeout(()=>{
            goBack()
           },2000)
        
      
          
        }
        else{
          toast.error('error in submitting')
        }
      }
      else{
        toast.error('session expired!!!')
        setTimeout(()=>{
          navigate('/')
        },500)
      }

       

      }
      catch(error){
        console.error('error in submitting Survey',error)
      }
    }
    const handleAddMembers=()=>{
      if(addMemebrs==true){
        setAddMembers(false)
         
      }
      else{
        getAllVoters()
        setAddMembers(true)    
      }
    }
    useEffect(()=>{
    
      if(searchTerms==null){
       
        setTotalAddVoters(addMembersList)
        
      }
      
      else{
  
        const filteredVoters=addMembersList.filter(voter=>(voter.Name.toLowerCase().includes(searchTerms.toLowerCase()))
        ||(voter.Epic.toLowerCase().includes(searchTerms.toLowerCase()))
        ||(voter.House_Number.toLowerCase().includes(searchTerms.toLowerCase())));
        setTotalAddVoters(filteredVoters)
      }
    },[searchTerms,addMembersList])


    const addNewMember=(voter)=>{
      Members.push(voter)
      toast.success(`${voter.Name} added To Family Members `)

    }








    
     
  
      
  


   
  return (
    <div className='SurveyFormMainCont'>
      <ToastContainer/>
         <div className='SurveyHeaderCont'>
            <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack}/>
             <div>Survey : {VoterId}</div>
        </div>

        <div className='SurveyFormCont'>
          <div className='SurveyDetails'>
            <div className='SName'><span>Name : </span>{Name}</div>
            <div className='SName'><span>{Relation} : </span> {RName}</div>
            <div className='SAgeGenderCont'>
              <div className='SAge'><span>Age : </span>{Age}</div>
              <div className='SAge'><span>Gender : </span>{Gender}</div>
            </div>
            <div className='SHouseNo' ><span>House No : </span> {HouseNo}</div>
            <div><span>Family Members : </span>{selectedMembers.length}</div>
          

          </div>

          {ShowForm?<div className='SurveyForm'>
          
           
            
            
           {/* <input type='text' placeholder='Mobile Number'  value={Mobile} onChange={(e)=>{setMobile(e.target.value)}}/>*/}
            <Select placeholder={'Select Caste'} 
            showSearch
            options={Castes} 
            value={Caste}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            onSelect={(value,option)=>{ setCaste(value)}} 
            className='SelectAntd'/>

            <Select placeholder={'Select Problem'}
             options={Problems}
            className='SelectAntd'
            value={Problem}
            onSelect={(value,option)=>{ setProblem(value)}}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            />



            <Select placeholder={'Select Remarks'}
             options={Remarks}
             value={Remark}
             onSelect={(value,option)=>{ setRemark(value)}}
              className='SelectAntd'
              optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }/>
            <input type='text' placeholder='Avialbility ' value={Availability} onChange={(e)=>{setAvailability(e.target.value)}}/>
            <div className='pool'>
            <label htmlFor="">Select Pool</label>
                    <Radio.Group >
                              <Radio className='pools' value={1}>A</Radio>
                              <Radio className='pools' value={2}>B</Radio>
                    </Radio.Group>
                    </div>                      
            {/* <input type='text' placeholder='Nearest Location ' value={Location} onChange={(e)=>{setLocation(e.target.value)}}/> */}


           
            <div className='ColorsCont' style={{background:Color}}>
              <div className='RedColor' onClick={()=>{setColor('Red')}}></div>
              <div className='YellowColor' onClick={()=>{setColor('Yellow')}}></div>
              <div className='OrangeColor' onClick={()=>{setColor('Blue')}}></div>
              <div className='GreenColor' onClick={()=>{setColor('linear-gradient(to right,green,red,blue,yellow)')}}></div>

            </div>

           {/* <input type='text' value={Observation} onChange={(e)=>{setObservation(e.target.value)}} placeholder='Observations'/> */}

          </div>:
          <div className='FamilyMembersCont'>
          
            <div className='FamilyMembCont'>In this House No <strong style={{color:'red'}}>{HouseNo}</strong> there is <strong style={{color:'red'}}>{MembersCount}</strong> Members (Possibility).</div>
            {/* <div className='FamilyMembCont'>Confirm with a family member and choose from the following family members carefully.</div> */}
            <div className='resetAddCont'>
            <div className='resetBtn' onClick={clearSelectors} style={{color:'red',fontWeight:'bold'}}>reset</div>
            <div className='addBtn' onClick={handleAddMembers} style={{color:'red',fontWeight:'bold'}}>{addMemebrs!=true?'Add':'Back'}</div>
            </div>
            {addMemebrs!=true?<div className='MembersList'>
              {Members.length>0?Members.map((member)=>(
              
                <label>
                    <input type='checkbox'
                     className='selectName'
                     onChange={(event) => handleSelectedMembers(event, member)}

                     checked=  {selectedMembers.includes(member.Epic)}
                     
                    />{member.Name}
                </label>

              )):<Spin />
              }
              
              



            </div>:
            <div className='addMembersMainCont'>
                <input type='search' className='searchMember' value={searchTerms} onChange={(e)=>{setSearchTerms(e.target.value)}} placeholder='Search By Name,epic'/>
                
                <div className='addMembersVoterList'>
              {TotalAddVoters.length>0?
                TotalAddVoters.map((voter)=>(

                  <div className='VoterCard' onClick={()=>{addNewMember(voter)}} style={voter.Survey===1?{background: 'linear-gradient(90deg, rgba(255,255,255,1) 94%, rgba(0,255,8,0.978203781512605) 94%)'}:{background:'linear-gradient(90deg, rgba(255,255,255,1) 96%, rgba(0,1,152,0.978203781512605) 96%)'}}>

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
                    <div className='surveyer'>{voter.Surveyer}</div>
                   
                  </div>
                )):<Spin/>
                
              }
                

            </div>
            </div>}
            

          <div>

          

          </div>

           
          </div>
          
          
          
          }
          {ShowForm?<div className='SSubmitBtn'  onClick={submitSurvey}>Submit</div>:<div className='SSubmitBtn' onClick={()=>{setShowForm(true)}}>Confirm</div>}
            








        </div>

    </div>
  )
}

export default SurveyForm;