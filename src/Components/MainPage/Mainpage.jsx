import React, { useEffect, useState } from 'react'
import './Mainpage.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import AuthService from '../../Services/GetAuthServices';
import useLocation from '../../Services/GetGeoLocation';

function Mainpage() {
    
    
    const [Mobile,setMobile]=useState(null)
    const [Name,setName]=useState(null)
    const [Allocate,setAllocate]=useState(0)
    const [Complete,setComplete]=useState(0)
    const [Constituency,setConstituency]=useState('Constituency');
    const [Booth,setBooth]=useState(null)
    const [Ward,setWard]=useState(null)
   // const [location, setLocation] = useState(null);
    const [permissionDenied, setPermissionDenied] = useState(false);


    const handleLocationChange = (position) => {
        console.log('New Location:', position);
        // You can use the latitude and longitude as needed in your application
      };
    
    const { loc, error } = useLocation(handleLocationChange);
    

    const navigate=useNavigate()
    const goToPage=(page)=>{
        navigate(`${page}`)

    }


    const getUserDetails = async () => {
       
      
        const token = Cookies.get('jwtToken');
       
      
        if (!token) {
          console.log('Token is missing');
          navigate('/')
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
          
          
          
         
          setMobile(data[0].Surveyer)
          setName(data[0].Name)
         
          Cookies.set('Surveyer',data[0].Name)
          
          
          setAllocate(data.length)
          setComplete(data.filter((data)=>{data.Status==='Completed'}).length)
          setConstituency(data[0].Constitunecy)
          setBooth(data[0].Booth)
          setWard(data[0].Wards)
            
        } else {
            navigate('/')
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
const logout=()=>{
    Cookies.remove('jwtToken');
    Cookies.remove('Surveyer');
    navigate('/')
}


      
 
  return (
    <div className='MainPageMainCont'>
        <div className='HeaderBarCont'>

            <div className='ProfileCont'>
                <Icon icon="iconamoon:profile-thin" className='ProfileIcon'/>
                <div className='AddressMainCont'>
                    <div className='NameCont'>
                        <div className='Name'>{Name}</div>
                        <Icon icon="eva:arrow-down-fill"  />
                    </div>
                    <div>
                        <div className='Address'>{Mobile}</div>
                    </div>
                </div>

            </div>
            <div className='HeadIcons'>
                <Icon icon="mingcute:notification-line"  className='BellIcon' />
                <Icon icon="ant-design:logout-outlined" onClick={logout} className='LogoutIcon' />
                <Icon icon="ph:question-light"  className='QueryIcon' />
            </div>


        </div>
        <div className='menuCont'>
            <div className='ConstituencyDetailsCont'>
                <div className='Assembly'>{Constituency}</div>
                <Icon icon="material-symbols-light:keyboard-arrow-right" className='Icon'/>
                
                

            </div>

            <div className='AllocatedFinishedCont'>
                    <div className='AllocatedCont'>
                         <div className='AllocatedBooths'>{Allocate}</div>
                        <div className='AllocatedText'>Allocated</div>
                    </div>
                    <div className='FinishedCont'>
                         <div className='FinishedBooth'>{Complete}</div>
                        <div className='AllocatedText'>Completed</div>
                    </div>
                </div>

                <div className='menuItemsCont'>
                    <div className='SurveyTitle'>Survey</div>
                    <div className='menuItemsContt'>
                
                    <div className='OptionCont' onClick={()=>{goToPage('booth-list')}}>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Booths</div>
                    </div>
                    <div className='OptionCont'  onClick={()=>{goToPage('wards-list')}}>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Wards</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="fluent-mdl2:b-i-dashboard" className='OptionContIcon' onClick={()=>{goToPage('areas-list')}} />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Mandals</div>
                    </div>
                    </div>


                    


                </div>
                <div className='ConstituencyDetailsCont' onClick={()=>{goToPage(`find-voter/${Ward}/${Booth}`)}}>
                <div className='Assembly'>Find A Voter</div>
                <Icon icon="material-symbols-light:keyboard-arrow-right" className='Icon'/>
                    </div>
                <div className='menuItemsCont'>
                    <div className='SurveyTitle'>Others</div>
                    <div className='menuItemsConttt'>
                
                    <div className='OptionCont'>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Mobile</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                        <div>Family</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="fluent-mdl2:b-i-dashboard" className='OptionContIcon' />
                        <div>House No</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    <div className='OptionCont'>
                        <Icon icon="tabler:location" className='OptionContIcon'  />
                        <div>Areas</div>
                    </div>
                    </div>


                    


                </div>
            

        </div>
        <div className='navBarCont'>
            <div className='OptionCont'>
                <Icon icon="charm:home"    className='OptionContIcon activeNavIcon'/>
                <div className='activeNav'>Home</div>
            </div>
            <div className='OptionCont'>
                <Icon icon="mdi:format-list-numbers" className='OptionContIcon'  />
                <div>Booths</div>
            </div>
            <div className='OptionCont'>
                <Icon icon="fluent-mdl2:b-i-dashboard" className='OptionContIcon' />
                <div>Status</div>
            </div>
            <div className='OptionCont'>
                <Icon icon="tabler:location" className='OptionContIcon'  />
                <div>Location</div>
            </div>
            
            
        </div>

    </div>
  )

  }
export default Mainpage