import React, { useEffect, useRef } from 'react'
import './Otp.css'
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Otp = () => {

  const resend = useRef()
  const location = useLocation()
  const [otp, setOtp] = useState('');
  const [email,setEmail] = useState(location.search.substring(1))
  const navigate = useNavigate()


  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp.join(''));

  };

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/auth/otpVerify',{email:email,userOtp:otp}).then((response)=>{
      console.log(response);
      navigate('/')
    }).catch((error)=>{
      console.log(error);
    })
  };


  const resendOtp =async(e)=>{
       e.preventDefault()
       let timer  = 60;
       const countdownInterval = setInterval(function () {
              const minutes = Math.floor(timer / 60);
              const seconds = timer % 60;

              resend.current.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

              if (--timer < 0) {
                     clearInterval(countdownInterval);
                     resend.current.textContent = "Resend OTP";
                     resend.current.disabled = false; // Enable the button after timer ends
              }
       }, 1000);
       await axios.post('http://localhost:3000/auth/otpResend',{email:email}).then((response)=>{
          console.log(response);
      }).catch((error)=>{
         console.log(error);
       })
  }

useEffect(()=>{
  let timer  = 60;
  const countdownInterval = setInterval(function () {
         const minutes = Math.floor(timer / 60);
         const seconds = timer % 60;

         resend.current.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

         if (--timer < 0) {
                clearInterval(countdownInterval);
                resend.current.textContent = "Resend OTP";
                resend.current.disabled = false; // Enable the button after timer ends
         }
  }, 1000);

},[])

  

  return (
    <div className="otpcontainer common">
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 common">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-2xl mx-auto w-full max-w-lg rounded-2xl common">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-7 common">
          <div className="flex flex-col items-center justify-center text-center common">
            <div className="font-semibold text-3xl common">
              <p className="common">OTP Verification</p>
            </div>
          </div>
  
          <div className="common">
            <form className="otp-form common" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-6 common">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-sm common">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      className="otp-input w-14 h-14 common"
                      value={otp[index] || ''}
                      onChange={(e) => handleOtpChange(e, index)}
                    />
                  ))}
                </div>
                <div className="flex justify-center common">
                    <button 
                    className="flex px-5 text-center border rounded-xl outline-none py-4 bg-blue-700 hover:bg-blue-800 border-none text-white text-md common"
                    ref={resend} 
                    onClick={resendOtp}
                     disabled
                    >Resend</button>
                </div>
                <div className="flex items-center flex-col space-y-5 common">
                  <button
                    type="submit"
                    className="flex px-5 text-center border rounded-xl outline-none py-4 bg-blue-700 hover:bg-blue-800 border-none text-white text-md common"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Otp
