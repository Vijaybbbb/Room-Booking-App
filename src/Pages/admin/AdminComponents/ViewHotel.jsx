import React, { useEffect, useState } from 'react'
import '../AdminComponents/css/viewHotel.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';



const ViewHotel = ({ hotelId, handleGoBack }) => {
      
       const { data, loading, error, refetchData } = useFetch(`${baseUrl}/hotels/${hotelId}`)
       const [showUpdate, setShowUpdate] = useState(true)
       const [preData,setPreData] = useState(data)
       useEffect(() => {
              if (data) {
                  setPreData(data);
                  setHotelData(data);
              }
          }, [data]);

      // console.log(preData);
       const [hotelData, setHotelData] = useState(preData);

       const getValue = (e) =>{
              setHotelData({
                     ...hotelData,
                     [e.target.name]:e.target.value
              })
              setShowUpdate(false)
       }
     
       // Function to handle form submission
       const handleUpdate = async (e) => {
         e.preventDefault();
        await axios.put(`${baseUrl}/hotels/find/${hotelId}`,hotelData,{withCredentials:true}).then((res)=>{
              handleGoBack()
        }).catch((err)=>{
              console.log(err);
        })

       };

       const handleDelete=async(e)=>{
              e.preventDefault();
              await axios.delete(`${baseUrl}/hotels/find/${hotelId}`,{},{withCredentials:true}).then((res)=>{
                     handleGoBack()
               }).catch((err)=>{
                     console.log(err);
               })
       }

       return (
              <div>
                     <div className='singleHotelPage'>
                            <button className='new button helperButtons' style={{width:'65px'}} onClick={handleGoBack}>Previous</button>
                            <div className="container">
                                   <form id="contact">
                                          <h3>Hotel information</h3><br />
                                          <label htmlFor="" style={{marginBottom:'10px'}}>Hotel Name</label>
                                          <fieldset>
                                                 <input
                                                        name='name'
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                        value={hotelData?.name || ''}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="" style={{marginBottom:'10px'}}>Hotel Type</label>
                                          <fieldset>
                                                 <input
                                                        name='type'
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                        value={hotelData?.type || ''}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">City</label>
                                          <fieldset>
                                                 <input
                                                        name='city'
                                                        type="email"
                                                        tabIndex="2"
                                                        required
                                                        value={hotelData?.city || data?.city}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Address</label>

                                          <fieldset>
                                                 <input
                                                       name='address'
                                                        type="tel"
                                                        tabIndex="3"
                                                        required
                                                        value={hotelData?.address || ''}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Distance</label>
                                          <fieldset>
                                                 <input
                                                        name='distance'
                                                        type="url"
                                                        tabIndex="4"
                                                        required
                                                        value={hotelData?.distance || ''}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                         
                                          <label htmlFor="">Cheapest Price</label>
                                          <fieldset>
                                                 <input
                                                        name='cheapestPrice'
                                                        type="url"
                                                        tabIndex="4"
                                                        required
                                                        value={hotelData?.cheapestPrice || ''}
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Description</label>
                                          <fieldset>
                                                 <textarea
                                                       name='description'
                                                        tabIndex="5"
                                                        required
                                                        value={hotelData?.description || ''}
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

export default ViewHotel
