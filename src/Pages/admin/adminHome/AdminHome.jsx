import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../utils'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './AdminHome.css'

const AdminHome = () => {

  const adminDetails = useSelector(state => state.adminDetails)
  const [access,setAccess]  = useState(false)
  const [error,setError]  = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    fetchAdminHome()
  },[access])

  async function fetchAdminHome(){
    await axios.post(`${baseUrl}/admin/adminHome?userId=${adminDetails?.userId}`,{},{withCredentials:true}).then((res)=>{
      console.log(res);
      res?.status === 200 ?  setAccess(true) :  setAccess(false)
    }).catch(err=>{
        setAccess(false)
    })
  }

  return (
    <div>
        {
          access ? (
              <div>
                 <div className="admindashboard">
      <div className="left">
        <div className="navigation">
          <div className="wrapper2">
            <div className="abilan">
              <h1>ADMIN</h1> 
            </div>
            <div className="folders">Folders</div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Inbox" />
              </div>
              <div className="icon-name1">Messages
                <button className="buton-span"> 20 </button>
              </div>
            </div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Inbox" />
              </div>
              <div className="icon-name1">Inbox
                <button className="buton-span"> 20 </button>
              </div>
            </div>
            {/* Repeat the rest of the folder-icons here */}
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-header">
          <div className="top-bar">
            <div className="top-bar-justify">
              <div className="big-inbox">Inbox</div>
            </div>
            <div className="profile2">
              <img src="https://www.seekclipart.com/clipng/middle/103-1032140_graphic-transparent-1-vector-flat-small-user-icon.png" alt="Profile" />
              <div className="icon-name5">Larry Nunez</div>
            </div>
          </div>
          <hr className="new-hr" />
          <div className="right-bottom">
            <div className="check">
              <label className="checkbox">
                <input type="checkbox" />
              </label>
              <div className="down-arrow">
                <img src="https://i.ibb.co/WDqrXj6/drop-down-arrow.png" alt="Arrow" />
              </div>
            </div>
            <div className="middle-buttons">
              <div className="buttons">
                <button className="new button"> 
                  <img src="https://i.ibb.co/X4j3TZR/reload.png" alt="Reload" />
                </button>
                <button className="new button"> 
                  <img src="https://i.ibb.co/L60Yr87/eye.png" alt="Eye" />
                </button>
                <button className="new button"> 
                  <img src="https://i.ibb.co/Lv6TqBG/waste-bin.png" alt="Waste Bin" />
                </button>
              </div>
              <div className="form has-search">
                <input className="text" type="search" placeholder="Search here..." name="search" />
                <span className="searchIcon">
                  <img src="https://i.ibb.co/sqFgRq8/search.png" alt="Search" />
                </span>
              </div>
            </div>
            <div className="search-arrow">
              <img src="https://i.ibb.co/cx2t05H/scroll-arrows.png" alt="Scroll Arrows" />
            </div>
          </div>
        </div>
        {/* Content of the right-body */}
         <div className='columnContainer1'>
                  <main>
                    <div className="columnContainer">
                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>User Management</b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>

                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>Hotel Management</b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>


                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>Room Management</b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>


                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>Bookings </b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="columnContainer">
                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>User Management</b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>

                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>Hotel Management</b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>


                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>Room Management</b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>


                      <div className="col s6">
                        <div style={{ padding: '35px' }} align="center" className="card">
                          <div className="row">
                            <div className="left card-title">
                              <b>Bookings </b>
                            </div>
                          </div>
                          <div className="row">
                            <a href="#!">
                              <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
                                <i className="indigo-text text-lighten-1 large material-icons">person</i>
                                <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
                              </div>
                            </a>
                            
                            {/* Repeat the rest of the cards here */}
                          </div>
                        </div>
                      </div>

                    </div>


                    <div className="fixed-action-btn click-to-toggle" style={{ bottom: '45px', right: '24px' }}>
                      <ul>
                        {/* Repeat the rest of the list items here */}
                      </ul>
                    </div>
                  </main>
                </div>

              </div>
              </div>
              </div>
          ):(
            <div><Link to={'/adminLogin'}>Authentication Failed PLease Login Again</Link></div>
          )
        }
    </div>
  )
}

export default AdminHome
