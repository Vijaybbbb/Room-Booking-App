import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../../../utils'

const CreateNewRoom = ({hotelId,handleGoBack}) => {

       const [roomData,setRoomData]  = useState()

       const getValue = (e) =>{
              setRoomData({
                     ...roomData,
                     [e.target.name]:e.target.value
              })
              
       }

      async function handleCreateRoom(e){
               e.preventDefault();
              await axios.post(`${baseUrl}/rooms/createRoom/${hotelId}`,roomData,{withCredentials:true}).then((res)=>{
                     handleGoBack()
              }).catch((err)=>{
                     console.log(err);
              })
       }


  return (
    <div>
      <div className='singleHotelPage'>
                            <button onClick={handleGoBack} >back</button>
                            <div className="container">
                                   <form id="contact">
                                          <h3>Create new Room</h3><br />
                                          <label htmlFor="" style={{marginBottom:'10px'}}>Room Title</label>
                                          <fieldset>
                                                 <input
                                                        name='title'
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                       
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="" style={{marginBottom:'10px'}}>Room Price</label>
                                          <fieldset>
                                                 <input
                                                        name='price'
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                        
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Maximum People</label>
                                          <fieldset>
                                                 <input
                                                        name='maxPeople'
                                                        type="text"
                                                        tabIndex="2"
                                                        required
                                                      
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Description</label>

                                          <fieldset>
                                                 <input
                                                       name='desc'
                                                        type="text"
                                                        tabIndex="3"
                                                        required
                                                        
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Room Numbers</label>
                                          <fieldset>
                                                 <input
                                                        name='roomNumbers'
                                                        type="text"
                                                        tabIndex="4"
                                                        required
                                                        
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                         
                                   
                                          <fieldset>
                                                 <button type="" 
                                                 id="contact-submit" 
                                                 data-submit="...Sending"
                                                 onClick={handleCreateRoom}
                                                  >
                                                        Create Room
                                                 </button><br /><br /><br />
                                                
                                          </fieldset>
                                   </form>
                            </div>
                     </div>
    </div>
  )
}

export default CreateNewRoom
