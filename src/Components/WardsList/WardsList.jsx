import React from 'react'
import './BoothList.css'
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import BoothService from '../../Services/GetBoothsService';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
function WardsList() {
    const navigate=useNavigate()
    const [Wards,setWards]=useState([])


    const goBack=()=>{
        navigate(-1)
    }
    const getVoters=(WardNo)=>{
        navigate(`ward-voter-list/${WardNo}`)
    }
    const getUserDetails = async () => {
        const token = Cookies.get('jwtToken');
       
      
        if (!token) {
          console.log('Token is missing');
          return;
        }
      
        const response = await fetch('https://api-pdp.thepeoplepulse.org/Wards-Details', {
          method: 'POST',
          headers: {
            authorization:`Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(data)
        
          setWards(data)
          
         
        } else {
          console.error('Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: await response.text(),
          });
        }
    }
useEffect(()=>{
    getUserDetails()
},[])
      

    return (
    <div className='BoothListMainCont'>
        <div className='BoothHeaderCont' >
         <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack} />
         <div>Wards</div>
        </div>
        <div className='BoothListCont'>
            <div className='AllocatedFinishedCont'>
                        <div className='AllocatedCont'>
                            <div className='AllocatedBooths'>{Wards.length}</div>
                            <div className='AllocatedText'>Allocated</div>
                        </div>
                        <div className='FinishedCont'>
                            <div className='FinishedBooth'>{Wards.filter((data)=>{data.Status==='Completed'}).length}</div>
                            <div className='AllocatedText'>Completed</div>
                        </div>
            </div>
            <div className='BoothList'>
                <div className='BoothsListGrid'>
                    {
                        Wards.map((booth)=>(
                            <div className='BoothCont' key={booth.Booth} onClick={()=>{getVoters(booth.Wards)}}>
                                <div className='Status' key={booth.Booth} style={{color:booth.Status!='Completed'?'yellow':'Green'}}>{booth.Status}</div>
                                <div className='BoothNo' key={booth.Booth}>{booth.Wards}</div>
                                <div className='WardNo' key={booth.Booth}>Ward : {booth.Wards}</div>  
                            </div>

                        ))
                    }
                  

                </div>
                

            </div>

        </div>


    </div>
  )
}

export default WardsList