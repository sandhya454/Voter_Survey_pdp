import React, { useState,useEffect} from 'react'
import './AreasList.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Icon } from '@iconify/react'
function AreasList() {
    const navigate=useNavigate()
    const [Areas,setAreas]=useState([])
    const goBack=()=>{
        navigate(-1)

    }
    const getUserDetails = async () => {
        const token = Cookies.get('jwtToken');
       
      
        if (!token) {
          console.log('Token is missing');
          return;
        }
      
        const response = await fetch('https://api-pdp.thepeoplepulse.org/Areas-Details', {
          method: 'POST',
          headers: {
            authorization:`Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
         
        
          setAreas(data.filter((res)=>res.Wards!=0 && res.Area!='999-'))
         
          
         
        } else {
          console.error('Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: await response.text(),
          });
        }
    }
    const getVoters=(Area,BoothNo)=>{
      navigate(`area-voter-list/${Area}/${BoothNo}`)
  }
    useEffect(()=>{
        getUserDetails()
     },[])
  return (
    <div className='AreasListMainCont'>
        <div className='BoothHeaderCont'  >
            <Icon icon="gravity-ui:arrow-left" className='ArrowIcon' onClick={goBack} />
            <div>Areas</div>
        </div>
        <div className='AreaListCont'>
            {
                Areas.map((area)=>(
                  <>
                    <div className='AreaCont' onClick={()=>{getVoters(area.Area,area.Booth)}}>
                        <div className='Area' >{area.Area}</div>
                        <div className='AreaDetails'>
                            <div>{area.Village}</div>
                            <div>Booth : {area.Booth}</div>
                            <div>Ward : {area.Wards}</div>
                        </div>
                    </div>
                    </>
                ))
            }

        </div>
    </div>
  )
}

export default AreasList