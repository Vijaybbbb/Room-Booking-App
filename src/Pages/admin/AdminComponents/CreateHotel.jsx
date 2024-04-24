import React, { useState } from 'react'
import '../AdminComponents/css/createHotel.css'
import axios from 'axios'
import { baseUrl } from '../../../utils'

const CreateHotel = ({compClick,showHotelCreation,setShow}) => {
       const [hotelData,setHotelData]  = useState()
       const [images,setImages]  = useState([])


       let getValue = (e) => {
              setHotelData({
                  ...hotelData,
                  [e.target.name]: e.target.value
              })
      
          }

       async function handleCreate(e) {
              e.preventDefault();
              const formData = new FormData();

              images.forEach((image) => {
                     formData.append('images', image);
              });
              for (const key in hotelData) {
                     formData.append(key, hotelData[key]);
                   }

              await axios.post(`${baseUrl}/hotels`, formData ,

                     {
                            withCredentials: true,
                            headers: {
                                   'Content-Type': 'multipart/form-data'
                            }
                     }).then((res) => {

                            setShow(false)

                     }).catch((error) => {
                            console.log(error);
                     })
       }

          function onInputChange(e){
            //  console.log(e.target.files);
            const files = Array.from(e.target.files);
            setImages([...images, ...files]);
             
          }

  return (
    <div>
    {
       showHotelCreation ? (
              <div>
                      <div className='createHotelPage'>
                            <button onClick={()=>{setShow(false)}}>back</button>
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
                                                       
                                                        onChange={getValue}
                                                 />
                                          </fieldset>
                                          <label htmlFor="">Description</label>
                                          <fieldset>
                                                 <textarea
                                                       name='description'
                                                        tabIndex="5"
                                                        required
                                                       
                                                        onChange={getValue}
                                                 ></textarea>
                                          </fieldset>
                                          <label htmlFor="">Images</label>
                                          <fieldset>
                                                 <div style={{height:'100px'}}>
                                                 <input type="file" multiple   onChange={onInputChange} />
                                                 </div>
                                          </fieldset>
                                          <fieldset>
                                                 <button type="" 
                                                 id="contact-submit" 
                                                 data-submit="...Sending"
                                                 onClick={handleCreate}
                                                  >
                                                        Create Hotel
                                                 </button><br /><br /><br />
                                                
                                          </fieldset>
                                   </form>
                            </div>
                     </div>
              </div>
       ):(
              <div className="col s6" onClick={() => { compClick(event, 'CreateHotel') }}>
              <div style={{ padding: '35px' }} align="center" className="card">
                     <div className="row">
                            <div className="left card-title">
                                   <b>Create Hotel</b>
                            </div>
                     </div>
              </div>
       </div>
       )
    }
    </div>
  )
}

export default CreateHotel
