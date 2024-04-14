import React from 'react'
import './Reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch.js'


const Reserve = ({setOpen,hotelId}) => {

 const {data,loading,error} = useFetch(`http://localhost:3000/hotels/room/${hotelId}`)


  return (
    <div className='reserve'>
      <div className="rContainer">
              <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
              <span>Select Your Rooms : </span>
              { 
              data.map(item=>(
                <div className="rItem">
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">Max People : {item.maxPeople}</div>
                  </div>
                </div>
              ))
              }
      </div>
    </div>
  )
}

export default Reserve
