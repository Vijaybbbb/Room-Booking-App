import React, { useContext, useState } from 'react';
import './Reserve.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch.js';
import { baseUrl } from '../../utils.js';
import {SearchContext}  from '../../context/SearchContext.jsx'
import axios from 'axios';
import { tr } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../Checkout/Checkout.jsx';
import {addCheckout} from '../../Redux/checkoutSlice.js'

const Reserve = ({ setOpen, hotelId, price,handleOpenCheckout,images}) => {
  const { data, loading, error } = useFetch(`${baseUrl}/hotels/room/${hotelId}`);
  console.log(data);
  const [selectedRooms,setSelectedRooms] = useState([])
  const {date} = useContext(SearchContext)
  const {userId}  = useSelector(state => state.userDetails)
  const [openCheckout,setOpenCheckout] = useState(false) 
  const [numbers,setNumbers] = useState([])
  const dispatch = useDispatch()
  const [floorID,setFloor] = useState()

//get all dates according to date
const getDatesRange = (startDate,endDate) =>{

  const start  = new Date(startDate)
  const end  = new Date(endDate)

  const date  = new Date(start.getTime())
  let list = []
  while(date <= end){
   
    list.push(new Date(date).getTime())
    date.setDate(date.getDate()+1)
  }
  return list
}
const allDates  = getDatesRange(date[0].startDate,date[0].endDate);

//checking room availability
const isAvailable = (roomNumber) =>{
   
    const isFound  = roomNumber.unavailableDates.some((item,index) => {
    return allDates.includes(item);

})
  return isFound
}



//handle rooms selecting
  const handleSelect = (event,roomNumber) => {
    const checked = event.target.checked
    const value = event.target.value
    setSelectedRooms(checked ? [...selectedRooms,value]  :
       selectedRooms.filter((item)=>item !== value)) 
       setNumbers(checked ? [...numbers, roomNumber] : numbers.filter((item) => item !== roomNumber));
    
  };


  //handle button click
  const handleClick = async () =>{
    const data = {
      hotelId:hotelId,
      userId:userId,
      rooms:[selectedRooms],
      price:price,
      dates:allDates,
      roomNumbers:[numbers],
      images:[images]
    }
      dispatch(addCheckout(data))
      setOpenCheckout(true)
      
     // handleOpenCheckout()
      
  }

  async function reserve (){
    try {
        await Promise.all(selectedRooms.map(roomId=>{
          const res = axios.put(`${baseUrl}/rooms/availability/${roomId}`,{dates:allDates,userId:userId,hotelId:hotelId,price:price})
              
        }))
        
      } catch (error) {
        console.log(error);
      }
  }
  
 function handleClose(){
  setOpenCheckout(false)
 }


  return (
    <div>
      {
        openCheckout ?(
          <Checkout handleClose={handleClose} reserve={reserve} setOpen={setOpen}/>
        ):(
             
              
                <div className="reserve">
                <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />

              {
                data.length > 0 ? (
                  <div>
                  <span>Select Your Rooms : </span>
                    {data?.map((item) => (
                     <div className="rItem" key={item?.id}>
                       <div className="rItemInfo">
                         <div className="rTitle">{item?.title}</div>
                         <div className="rDesc">{item?.desc}</div>
                         <div className="rMax">Max People : {item?.maxPeople}</div>
                         <div className="rPrice">{item?.price}</div>
                       </div>
                       <div className="rSelectRooms">
                         {item?.roomNumbers?.map((roomNumber) => (
                           <div className="room" key={roomNumber?._id}>
                             <label htmlFor="">{roomNumber?.number}</label>
                             <input
                               type="checkbox"
                               value={roomNumber?._id}
                               //onChange={handleSelect}
                               onChange={() => { handleSelect(event, roomNumber?.number) }}
                               disabled={isAvailable(roomNumber)}
                             />
                           </div>
                         ))}
                       </div>
                     </div>
                   ))}
                  <button onClick={handleClick} className='rButton'>Reserve Now</button>
                  </div>
                ):(
                  <div>No Rooms</div>
                )
              
              }

               </div>
             </div>
            
             
        )
      }
    </div>
  );
};

export default Reserve;
