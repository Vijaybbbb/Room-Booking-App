import React, { useContext, useState } from 'react';
import './Reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch.js';
import { baseUrl } from '../../utils.js';
import {SearchContext}  from '../../context/SearchContext.jsx'
import axios from 'axios';

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`${baseUrl}/hotels/room/${hotelId}`);
  const [selectedRooms,setSelectedRooms] = useState([])
  const {date} = useContext(SearchContext)


//get all dates according to date
const getDatesRange = (startDate,endDate) =>{

  const start  = new Date(startDate)
  const end  = new Date(endDate)

  const date  = new Date(start.getTime())
  let list = []
  while(date <= end){
    console.log(date);
    list.push(new Date(date).getTime())
    date.setDate(date.getDate()+1)
  }
  return list
}
const allDates  = getDatesRange(date[0].startDate,date[0].endDate);
console.log(allDates);
const isAvailable = (roomNumber) =>{
  const isFound  = roomNumber.unavailableDates.some(dates => {
    
    console.log(dates)
     return allDates.includes(new Date(dates).getTime());
   
})
  // console.log(isFound);
  return !isFound
}

//handle rooms selecting
  const handleSelect = (event) => {
    const checked = event.target.checked
    const value = event.target.value
    setSelectedRooms(checked ? [...selectedRooms,value]  :
       selectedRooms.filter((item)=>item !== value)) 
  };

  //handle button click
  const handleClick = async () =>{
      try {
        await Promise.all(selectedRooms.map(roomId=>{
          const res = axios.put(`${baseUrl}/rooms/availability/${roomId}`,{dates:allDates})
          
        }))
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select Your Rooms : </span>
        {data.map((item) => (
          <div className="rItem" key={item.id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max People : {item.maxPeople}</div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label htmlFor="">{roomNumber.number}</label>
                  <input
                   type="checkbox"
                    value={roomNumber._id}
                     onChange={handleSelect}
                     disabled={!isAvailable(roomNumber)}
                     />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className='rButton'>Reserve Now</button>
      </div>
    </div>
  );
};

export default Reserve;
