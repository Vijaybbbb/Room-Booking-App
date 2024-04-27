import React, { useEffect, useState } from 'react'
import './OrderFailed.css'
import { useNavigate } from 'react-router-dom'

const OrderFailed = () => {
       const [timer ,setTimer] = useState(5)  
     
       
       const navigate = useNavigate()
       useEffect(()=>{
              setTimeout(()=>{
                     navigate('/')
                     clearTimeout()
              },10000)
       
              setInterval(()=>{
                     setTimer(timer-1)
              },1000)
       
       })
  return (
    <div>
     <div className='orderFailedPage'>
      <div className="tick-animation-ctn">
       <div className="icon icon--order-success svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
            <g fill="none" stroke="#f15a24" strokeWidth="2">
                <circle cx="77" cy="77" r="72" style={{ strokeDasharray: '480px, 480px', strokeDashoffset: '960px' }}></circle>
                <circle id="colored" fill="#f15a24" cx="77" cy="77" r="72" style={{ strokeDasharray: '480px, 480px', strokeDashoffset: '960px' }}></circle>
                <polyline className="st0" stroke="#fff" strokeWidth="8" points="40,77.8 114,77.8" style={{ strokeDasharray: '100px, 100px', strokeDashoffset: '200px' }} />
            </g>
        </svg>
    </div>
    <div>
    
          <h1 className='confirmtext'>Reservation Failed</h1>
        </div>
   
</div>

    </div>
    </div>
  )
}

export default OrderFailed
