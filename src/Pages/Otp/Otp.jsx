import React from 'react'

import './Otp.css'
import { useState } from 'react';


const Otp = () => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp.join(''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
  };

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
                  <input
                    type="text"
                    className="text-center px-5 outline-none rounded-lg border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 h-12 w-4/5 common"
                    id="otpCode"
                    value={otp}
                    readOnly
                  />
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
