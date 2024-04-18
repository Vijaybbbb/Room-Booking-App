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

       return (
              <div>
                     <div className='singleHotelPage'>
                            <button onClick={handleGoBack}>back</button>
                            <div className="card">
                                   <div className="container">
                                          <img src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="profile-img" />
                                          <h2>{data.username}</h2>
                                          <small>{data.email}</small>

                                          {/* <div className="bar">
                                                 <button className="btn" onClick={() => { }}>

                                                        <span>Update User</span>
                                                 </button>
                                                 <button className="btn btn-more" style={{ backgroundColor: '#cb2005' }} onClick={() => { }}>
                                                        <span>Delete</span>
                                                 </button>
                                          </div> */}

                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>

                                          </div>

                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default ViewHotel
