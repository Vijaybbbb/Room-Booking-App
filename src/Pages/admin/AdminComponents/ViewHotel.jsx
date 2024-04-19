import React, { useState } from 'react'
import '../AdminComponents/css/viewHotel.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'


const ViewHotel = ({ hotelId, handleGoBack }) => {

       const { data, loading, error, refetchData } = useFetch(`${baseUrl}/user/singleUser?id=${hotelId}`)
       const [showEditBox, setShowEditBox] = useState(true)
       const [userData, setUserData] = useState({
              username: data.username,
              email: data.email
       })


       const [name, setName] = useState('');
       const [email, setEmail] = useState('');
       const [phone, setPhone] = useState('');
       const [website, setWebsite] = useState('');
       const [message, setMessage] = useState('');
     
       // Function to handle form submission
       const handleSubmit = (e) => {
         e.preventDefault();
         // Process form submission here, e.g., send data to server
         console.log('Form submitted:', { name, email, phone, website, message });
         // Optionally, you can reset form fields here
         // setName('');
         // setEmail('');
         // setPhone('');
         // setWebsite('');
         // setMessage('');
       };
       return (
              <div>
                     <div className='singleHotelPage'>
                            <button onClick={handleGoBack}>back</button>
                            <div className="container">
                                   <form id="contact" onSubmit={handleSubmit}>
                                          <h3>Quick Contact</h3>
                                          <h4>Contact us today, and get reply within 24 hours!</h4>
                                          <fieldset>
                                                 <input
                                                        placeholder="Your name"
                                                        type="text"
                                                        tabIndex="1"
                                                        required
                                                        autoFocus
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                 />
                                          </fieldset>
                                          <fieldset>
                                                 <input
                                                        placeholder="Your Email Address"
                                                        type="email"
                                                        tabIndex="2"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                 />
                                          </fieldset>
                                          <fieldset>
                                                 <input
                                                        placeholder="Your Phone Number"
                                                        type="tel"
                                                        tabIndex="3"
                                                        required
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                 />
                                          </fieldset>
                                          <fieldset>
                                                 <input
                                                        placeholder="Your Web Site starts with http://"
                                                        type="url"
                                                        tabIndex="4"
                                                        required
                                                        value={website}
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                 />
                                          </fieldset>
                                          <fieldset>
                                                 <textarea
                                                        placeholder="Type your Message Here...."
                                                        tabIndex="5"
                                                        required
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                 ></textarea>
                                          </fieldset>
                                          <fieldset>
                                                 <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">
                                                        Submit
                                                 </button>
                                          </fieldset>
                                   </form>
                            </div>
                     </div>
              </div>
       )
}

export default ViewHotel
