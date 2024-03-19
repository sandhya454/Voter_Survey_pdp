import React from 'react'
import './Login.css'

import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Images/people_pulse_logo.png"

import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../../Services/GetAuthServices';
import useLocation from '../../Services/GetGeoLocation';

function Login() {
    const navigate = useNavigate()
    const [Mobile,setMobile]=useState(null);
    const [Password,setPassword]=useState(null);


  
    const GoToLogin=async()=>{
        if(Mobile!=null && Mobile.length==10 && Password!=null){
            const data={Mobile:Mobile,Password:Password}
            const response=await AuthService.ValidateLogin(data)
            
            
          
            if(response==true){
                toast.success('Login SuccessFull')
                navigate('mainpage')
            }
            else{
                toast.error('Login Failed')
            }
            

            
        }else{
            toast.error("Enter Correct Login Details")
        }
        
        
    }



    
      

  return (
    <div className='LoginMainCont'>
        <ToastContainer/>
        <div className='LoginCont'>
            <div className='LoginHeaderCont'>
                <img src={Logo} className='PPLogo' />
              

            </div>
            <div className='LoginText'>Login to your Account</div>
           
            <div className='LoginInputCont'>
                
                
                <input type='text' placeholder='Mobile Number' value={Mobile} onChange={(e)=>{setMobile(e.target.value)}} maxLength={10}/>
                <input type='password' placeholder='password' value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <div className='LoginBtn' onClick={GoToLogin}>Login</div>

            </div>
            


        </div>
    </div>
  )
}

export default Login