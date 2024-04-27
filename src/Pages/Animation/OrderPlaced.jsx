import React, { useEffect, useState } from 'react'
import './OrderPlaced.css'
import { useNavigate } from 'react-router-dom'


const OrderPlaced = () => {

     const [timer ,setTimer] = useState(5)  
     
       
const navigate = useNavigate()
useEffect(()=>{
       setTimeout(()=>{
              navigate('/myBookings')
              clearTimeout()
       },5000)

       setInterval(()=>{
              setTimer(timer-1)
       },1000)

})

  return (
 <div className='orderPlacedPage'> 
       <div className="animation-ctn">
      <div className="icon icon--order-success svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
          <g fill="none" stroke="#258ea6" strokeWidth="2">
            <circle cx="77" cy="77" r="72" style={{ strokeDasharray: "480px, 480px", strokeDashoffset: "960px" }} />
            <circle id="colored" fill="#258ea6" cx="77" cy="77" r="72" style={{ strokeDasharray: "480px, 480px", strokeDashoffset: "960px" }} />
            <polyline className="st0" stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4" style={{ strokeDasharray: "100px, 100px", strokeDashoffset: "200px" }} />
          </g>
        </svg>
        <div>
          <h1 className='confirmtext'>Reservation Confirmed</h1>
        </div>
        <div>

              <span>Redirecting in {timer} seconds</span>
        </div> 
      </div>
    </div>
 </div>
  )
}

export default OrderPlaced
