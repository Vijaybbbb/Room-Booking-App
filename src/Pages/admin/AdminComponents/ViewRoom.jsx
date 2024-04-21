import React, { useEffect, useState } from 'react'
import '../AdminComponents/css/viewHotel.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import axios from 'axios'



const ViewRoom = ({ roomId, handleGoBack }) => {
     
       const { data, loading, error,  } = useFetch(`${baseUrl}/rooms/singleRoom/${roomId}`)
       const [showUpdate, setShowUpdate] = useState(true)
       const [preData,setPreData] = useState(data)
       useEffect(() => {
              if (data) {
                  setPreData(data);
                  setRoomData(data);
              }
          }, [data]);
          console.log(data);

       const [roomData, setRoomData] = useState(preData);

       const getValue = (e) =>{
              setRoomData({
                     ...roomData,
                     [e.target.name]:e.target.value
              })
              setShowUpdate(false)
       }
     
       // Function to handle form submission
       const handleUpdate = async (e) => {
         e.preventDefault();
        await axios.put(`${baseUrl}/hotels/find/${roomId}`,roomData,{withCredentials:true}).then((res)=>{
              handleGoBack()
        }).catch((err)=>{
              console.log(err);
        })

       };

       const handleDelete=(e)=>{
              
              e.preventDefault();

       }

       return (
              <div>
                     <div className='singleHotelPage'>
                            <button onClick={handleGoBack}>back</button>
                            <div className="container">
                                   <form id="contact">
                                          <h3>Room information</h3><br />
                                          <label htmlFor="" style={{marginBottom:'10px'}}>Room Name</label>
                                          <fieldset>
                                                 <input
                                                        name='title'
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                        value={roomData?.title || data.title}
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
                                                        value={roomData.price || data.price}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Maximum persons</label>
                                          <fieldset>
                                                 <input
                                                        name='maxPeople'
                                                        type="email"
                                                        tabIndex="2"
                                                        required
                                                        value={roomData.maxPeople || data.maxPeople}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                         
                                          {/* <label htmlFor="">Room Numbers</label>
                                          <fieldset>
                                                 <input
                                                        name='cheapestPrice'
                                                        type="url"
                                                        tabIndex="4"
                                                        required
                                                        value={roomData.cheapestPrice || data.cheapestPrice}
                                                        onChange={getValue}
                                                 />
                                          </fieldset> */}
                                          <label htmlFor="">Description</label>
                                          <fieldset>
                                                 <textarea
                                                       name='desc'
                                                        tabIndex="5"
                                                        required
                                                        value={roomData.desc || data.desc}
                                                        onChange={getValue}
                                                 ></textarea>
                                          </fieldset>
                                          <fieldset>
                                                 <button type="" 
                                                 id="contact-submit" 
                                                 data-submit="...Sending"
                                                  onClick={handleUpdate}
                                                  disabled={showUpdate}
                                                  >
                                                        Update
                                                 </button><br /><br /><br />
                                                 <button onClick={handleDelete}>Delete</button>
                                          </fieldset>
                                   </form>
                            </div>
                     </div>
              </div>
       )
}

export default ViewRoom
