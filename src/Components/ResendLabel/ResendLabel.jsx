
import React, { useEffect, useRef } from 'react'

const ResendLabel = () => {
  const resend = useRef()

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
  return (
       <div className="flex justify-center common">
       <label 
       style={{fontFamily:'sans-serif'}}
       className="flex px-5 text-center border rounded-xl outline-none py-4 bg-blue-700 hover:bg-blue-800 border-none text-white text-md common"
       ref={resend} 
       onClick={resendOtp}
        disabled
       >Resend</label>
   </div>
  )
}

export default React.memo(ResendLabel)
