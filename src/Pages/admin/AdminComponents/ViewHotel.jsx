import React, { useState } from 'react'
import '../AdminComponents/css/viewHotel.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'



const ViewHotel = ({ hotelId, handleGoBack }) => {
      
       const { data, loading, error, refetchData } = useFetch(`${baseUrl}/hotels/${hotelId}`)
       const [showEditBox, setShowEditBox] = useState(true)
      
       console.log(data);

       const [hotelData, setHotelData] = useState({
              name:null,
              type:null,
              city:null,
              address:null,
              distance:null,
              discription:null,
              cheapestPrice:null
       });

       const getValue = (e) =>{
              setHotelData({
                     ...hotelData,
                     [e.target.name]:e.target.value
              })
       }
     
       // Function to handle form submission
       const handleUpdate = (e) => {
         e.preventDefault();

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
                                          <h3>Hotel information</h3><br />
                                          <label htmlFor="" style={{marginBottom:'10px'}}>Hotel Name</label>
                                          <fieldset>
                                                 <input
                                                        name='name'
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                       value={data.name}
                                                        onChange={(e) => getValue(e.target.value)}
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
                                                        value={data.type}
                                                        onChange={(e) => getValue(e.target.value)}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">City</label>
                                          <fieldset>
                                                 <input
                                                        name='city'
                                                        type="email"
                                                        tabIndex="2"
                                                        required
                                                        value={data.name}
                                                        onChange={(e) => getValue(e.target.value)}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Address</label>

                                          <fieldset>
                                                 <input
                                                       name='address'
                                                        type="tel"
                                                        tabIndex="3"
                                                        required
                                                        value={data.address}
                                                        onChange={(e) => getValue(e.target.value)}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Distance</label>
                                          <fieldset>
                                                 <input
                                                        name='distance'
                                                        type="url"
                                                        tabIndex="4"
                                                        required
                                                        value={data.distance}
                                                        onChange={(e) => getValue(e.target.value)}
                                                 />
                                          </fieldset>
                                         
                                          <label htmlFor="">Cheapest Price</label>
                                          <fieldset>
                                                 <input
                                                        name='cheapestPrice'
                                                        type="url"
                                                        tabIndex="4"
                                                        required
                                                        value={data.cheapestPrice}
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Description</label>
                                          <fieldset>
                                                 <textarea
                                                       name='description'
                                                        tabIndex="5"
                                                        required
                                                        value={data.description}
                                                        onChange={(e) => getValue(e.target.value)}
                                                 ></textarea>
                                          </fieldset>
                                          <fieldset>
                                                 <button type="" id="contact-submit" data-submit="...Sending" onClick={handleUpdate}>
                                                        Submit
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
