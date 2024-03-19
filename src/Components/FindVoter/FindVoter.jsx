import React, { useEffect } from 'react'
import './FindVoter.css'
import { Button, Drawer, Input,  Select, Space ,Empty,Spin} from 'antd';
const { Option } = Select;
import { Icon } from '@iconify/react'
import { useState } from 'react'
import {toast,ToastContainer} from 'react-toastify'

import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function FindVoter() {
  const { Search } = Input
    const params=useParams()
    const navigate=useNavigate()
    const Surveyer=Cookies.get('Surveyer')
    const [columns,setColumn]=useState('House_Number')
    
   
    const [details,setDetails]=useState([])
    const [Mandals,setMandals]=useState([])
    const [Villages,setVillages]=useState([])
    const [Wards,setWards]=useState([])
    const [Booths,setBooths]=useState([])
    const [Areas,setAreas]=useState([]) 
    const [Filters, setFilters] = useState(() => {
      const storedFilters = localStorage.getItem('filters');
      return storedFilters ? JSON.parse(storedFilters) : { Constituency: '38 - KAKINADA RUARL (GEN)' };
    });
    
    useEffect(() => {
      localStorage.setItem('filters', JSON.stringify(Filters));
    }, [Filters]);
    

    const [Mandal,setMandal]=useState(null)
    const [Village,setVillage]=useState(null)
    const [Ward,setWard]=useState(null)
    const [Booth,setBooth]=useState(null)
    const [Area,setArea]=useState(null) 


    const [VoterList,setVoterList]=useState([])
    const [isloading,setIsloading]=useState(false);

    const [SearchTerms,setSearchTerms]=useState(null)
   
    
    
    const getConstituencyDetails=async()=>{
   
   
    try{
    
      const response = await fetch('https://api-pdp.thepeoplepulse.org/constituency-details')
    
      if(response.ok){

        const data=await response.json()

        setDetails(data)

        const uniqueMandals = [...new Set(data.map(obj => obj.Mandal))];
        
        const convertedListMandals = uniqueMandals.map(mandal => ({
            value: mandal,
            label: mandal,
          }))
        setMandals(convertedListMandals)
        
        }

    }
    catch(error){
        console.error(error,'error in fetch')
    }

  }
  const getVillages=async()=>{
    try{
      let currentData=details
      if(Mandal!=null){
     
         currentData=details.filter((dat)=>dat.Mandal===Mandal)
      }
       
        const uniqueVillages = [...new Set(currentData.map(obj => obj.Village))];
       
        const convertedListVillages = uniqueVillages.map(village => ({
            value: village,
            label: village,
          }))
          
          setVillages(convertedListVillages)

    }
    catch(error){
        console.error(error,'error in get village')
    }

  }
  const getWards=async()=>{
    try{
     let currentData=details
     if(Village!=null){
       currentData=details.filter((dat)=>dat.Village===Village)
     }
       
        const uniqueWards = [...new Set(currentData.map(obj => obj.Wards))];

       
   
        const convertedListWards = uniqueWards.map(ward => ({
            value: ward,
            label: ward,
          }))
          
          setWards(convertedListWards)

    }
    catch(error){
        console.error(error,'error in get Wards')
    }

  }
  const getBooths=async()=>{
    try{
      let currentData=details
      if( Ward!=null){
        currentData=details.filter((dat)=>dat.Wards===Ward)
      }
     
      
       
        const uniqueBooths = [...new Set(currentData.map(obj => obj.Booth))];
      
        const convertedListBooths = uniqueBooths.map(booth => ({
            value: booth,
            label: booth,
          }))
          
          setBooths(convertedListBooths)

    }
    catch(error){
        console.error(error,'error in get Booths')
    }

  }
  const getAreas=async()=>{
    try{
      let currentData=details

        if(Booth!=null){
     
          currentData=details.filter((dat)=>dat.Booth===Booth)
        }
       
        const uniqueAreas = [...new Set(currentData.map(obj => obj.Area))];

      
        const convertedListAreas = uniqueAreas.map(area => ({
            value: area,
            label: area,
          }))
          
          setAreas(convertedListAreas)

    }
    catch(error){
        console.error(error,'error in get village')
    }

  }
  useEffect(()=>{
    getWards()
    getAreas()
    getBooths()
    getVillages()
   
  },[details])
  useEffect(()=>{
    getVillages()
  },[Mandal])

  useEffect(()=>{
    getWards()
  },[Village])

  useEffect(()=>{
    getBooths()
  },[Ward])

  useEffect(()=>{
    getAreas()
  },[Booth])

  useEffect(()=>{
    getAreas()
  },[details])


  


  const handleMandal=async(value)=>{
    setMandal(value)
   
   
   
    

  }
  const handleVillage=async(value)=>{
    setVillage(value)
    
   
    

  }
  const handleWards=async(value)=>{
    setWard(value)
  
    

  }
  const hadleBooths=async(value)=>{
    setBooth(value)
    
   
    

  }
  const handleAreas=async(value)=>{
    setArea(value)
   
   
    

  }

  useEffect(()=>{
    getConstituencyDetails()
 
  },[])
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onCancel = () => {
    setFilters({	Constituency:'38 - KAKINADA RUARL (GEN)'})
    Cookies.remove('Filters')
    setBooth(null)
    setArea(null)
    setMandal(null)
    setWard(null)
    setVillage(null)

    setOpen(false);
    
  };

  const goBack=()=>{
    navigate(-1)
  }


  const applyFilters=async()=>{
    console.log(Booth,Area,Ward,Village,Mandal,'hello')
   
    try{
      if(Area!=null){
        setFilters({Area:Area})
      }
      else if(Booth != null){
        setFilters({Booth:Booth})
      }
      else if(Ward!=null ){
        setFilters({Wards:Ward})

      }
      else if(Village!=null){
        setFilters({Village:Village})
      }
      else if(Mandal!=null ){
        setFilters({Mandal:Mandal})
      }
      Cookies.set(Filters,'Filters')
     


    }
    catch(error){
      console.error(error,'error in applying filters')
    }
  }
  useEffect(()=>{
    applyFilters()

  },[Booth,Area,Ward,Mandal,Village])
  const getVoters=async(value, _e, info)=>{
    
    

    
    
      setIsloading(true)
    
    

    
    try{
      setIsloading(true)
     
      await applyFilters()
     
      


      if(value!=''){
        
        
        
        const column= Object.keys(Filters)[0];
        const field=Filters[column]
       

        
        const response = await fetch(`https://api-pdp.thepeoplepulse.org/find-voters/${columns}/${value}/${column}/${field}`)
        if(response.ok){
          const data= await response.json()
          setVoterList(data.voterlist)   
          setIsloading(false)
        }
        else{
          setVoterList([])
          setIsloading(false)
        }
    }
    else{
      toast.error('please enter valid name,id,Hno')

    }
      
    }
    catch(error){
      console.error(
        error,'error in getting voters'
      )
    }
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
  const goToSurvey=(VoterId,surveyer,date,ward,booth)=>{
    if(Surveyer===undefined){
      toast.info('Session Expired')
      setTimeout(()=>{
        navigate('/')

      },1000)
     
    }
   
    const surveyDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
   

    if(surveyer==="" || Surveyer===surveyer ||Surveyer==="Ramki" ||Surveyer==="Manikanta" ){

      if(surveyer!="" ){
            if (surveyDate.getTime() === today.getTime() || Surveyer==="Ramki" || Surveyer==="Manikanta") {
            

            updateSurveyStatus(VoterId)      
            navigate(`voter-survey/${VoterId}`)
            }
            else{
              toast.error(`survey is submitted on ${surveyDate}`);
              setTimeout(()=>{
                toast.info(`contact admin for access`)
              },500)
       
      }
    }
    else{
      updateSurveyStatus(VoterId)      
      navigate(`/mainpage/find-voter/${ward}/${booth}/voter-survey/${VoterId}`)
    }
  }
  else{
    toast.error('No Permission')
  }
}
  
const handleColumn=(e)=>{
  setColumn(e.target.value)
  
}




  return (
    <div className='FindVoterMainCont'>
      <ToastContainer/>
        <div className='HeaderFindVoterCont'>
             <Icon icon="gravity-ui:arrow-left" className='HeaderFindVoterIcon' onClick={goBack}/>
            <div className='HeaderFindVoterCont'>
                Find Voter
            </div>
            <div onClick={showDrawer}>Filters</div>


        </div>
        <Drawer
        title="Filters"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onCancel}>Clear</Button>
            <Button onClick={onClose} type="primary">
              Apply
            </Button>
          </Space>
        }
      >
        <Select className='select'
        
         placeholder={'Select mandal'}
         showSearch
         optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={Mandals}
        onChange={handleMandal}
         value={Mandal}/>
        <Select className='select'
         placeholder={'Select village'}
         showSearch
         optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
          options={Villages}
           onChange={handleVillage}
            value={Village}/>
        <Select className='select'
         placeholder={'Select Ward'}
         showSearch
         optionFilterProp="children"
         filterOption={(input, option) => (option?.value.toString() ?? '').includes(input)}
        filterSort={(optionA, optionB) => {
          const valueA = optionA?.value || 0;
          const valueB = optionB?.value || 0;
          return valueA - valueB;
        }}

        
        options={Wards}
        onChange={handleWards}
        value={Ward}/>
        <Select className='select'
        placeholder={'Select Booth'}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => (option?.value.toString() ?? '').includes(input)}
       filterSort={(optionA, optionB) => {
         const valueA = optionA?.value || 0;
         const valueB = optionB?.value || 0;
         return valueA - valueB;
       }}

       
        
        options={Booths} 
        onChange={hadleBooths} 
        value={Booth}/>
        <Select className='select' 
        placeholder={'Select Area'} 
        showSearch
        optionFilterProp="children"
       filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
       filterSort={(optionA, optionB) =>
         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
       }
       
        options={Areas} 
        onChange={handleAreas} 
        value={Area}/>
       


      </Drawer>

      <div className='VoterListSearch'>
          <Search
          className='Search'
          placeholder="Search By Name,hno,Id"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={getVoters}
        
        />
        <select value={columns} onChange={handleColumn} className='selectColumns'>
          <option value={'Epic'}>Epic</option>
          <option value={'Name'}>Name</option>
          <option value={'House_Number'}>Hno</option>
        </select>
       
       
        <div className='VoterListMainContt'>
        {VoterList.length>=1?(isloading?<Spin/>:

<div className='VoterList1'>
  {

  VoterList.map((voter)=>(

   <div className='VoterCard'  onClick={()=>{goToSurvey(voter.Epic,voter.Surveyer,voter.Surveyed_on,voter.Wards,voter.Booth)}} style={voter.Survey==="1"?{background: 'linear-gradient(90deg, rgba(255,255,255,1) 94%, rgba(0,255,8,0.978203781512605) 94%)'}:{background:'linear-gradient(90deg, rgba(255,255,255,1) 96%, rgba(0,1,152,0.978203781512605) 96%)'}}>

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
      <div className='VoterAgeCont'>

        <div><strong>Ward : </strong>{voter.Wards}</div>
        <div><strong>Booth : </strong>{voter.Booth}</div>


      </div>
      <div className='surveyer'>{voter.Surveyer}</div>
     
    </div>
  ))
}

  

</div>):isloading&&SearchTerms!=null?<Spin tip="Loading Voters" size='large'></Spin>
        
        : <Empty/>
        
        }





          
          
         

          

        </div>
        
         


         
      

      </div>
      
     
        
    </div>
  )
}

export default FindVoter