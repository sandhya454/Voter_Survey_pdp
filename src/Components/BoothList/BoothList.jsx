import React from 'react'
import './BoothList.css'
import { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import BoothService from '../../Services/GetBoothsService';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
function BoothList() {
    const navigate=useNavigate()
    const [Booths,setBooths]=useState([])


    const goBack=()=>{
        navigate(-1)
    }
    const getVoters=(BoothNo)=>{
        navigate(`booth-voter-list/${BoothNo}`)
    }
    const getUserDetails = async () => {
        const token = Cookies.get('jwtToken');
       
      
        if (!token) {
          console.log('Token is missing');
          return;
        }
      
        const response = await fetch('https://api-pdp.thepeoplepulse.org/User-Details', {
          method: 'POST',
          headers: {
            authorization:`Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
        
          setBooths(data)
          
         
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
         <div>Booths</div>
        </div>
        <div className='BoothListCont'>
            <div className='AllocatedFinishedCont'>
                        <div className='AllocatedCont'>
                            <div className='AllocatedBooths'>{Booths.length}</div>
                            <div className='AllocatedText'>Allocated</div>
                        </div>
                        <div className='FinishedCont'>
                            <div className='FinishedBooth'>{Booths.filter((data)=>{data.Status==='Completed'}).length}</div>
                            <div className='AllocatedText'>Completed</div>
                        </div>
            </div>
            <div className='BoothList'>
                <div className='BoothsListGrid'>
                    {
                        Booths.map((booth)=>(
                            <div className='BoothCont' key={booth.Booth} onClick={()=>{getVoters(booth.Booth)}}>
                                <div className='Status' key={booth.Booth} style={{color:booth.Status!='Completed'?'yellow':'Green'}}>{booth.Status}</div>
                                <div className='BoothNo' key={booth.Booth}>{booth.Booth}</div>
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

export default BoothList