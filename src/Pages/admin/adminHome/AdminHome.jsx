import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../utils'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './AdminHome.css'
import UserManagement from '../AdminComponents/UserManagement'
import HotelManagement from '../AdminComponents/HotelManagement'
import RoomManagement from '../AdminComponents/RoomManagement'
import BookingsManagement from '../AdminComponents/BookingsManagement'
import CreateUser from '../AdminComponents/CreateUser'
import CreateHotel from '../AdminComponents/CreateHotel'
import CreateRoom from '../AdminComponents/CreateRoom'
import CreateCoupen from '../AdminComponents/CreateCoupen'
import ViewCoupens from '../AdminComponents/ViewCoupens'
import { storeAdmin } from '../../../Redux/adminLoginSlice'



const AdminHome = () => {

  const dispatch = useDispatch()
  const adminDetails = useSelector(state => state.adminDetails)
  console.log(adminDetails?.userId);
  const [access,setAccess]  = useState(false)
  const navigate = useNavigate()
  const [show,setShow]  = useState(false)
  const [openWindow,setOpenWindow]  = useState()


  useEffect(()=>{
    fetchAdminHome()
  },[access])

  async function fetchAdminHome(){
    await axios.post(`${baseUrl}/admin/adminHome?userId=${adminDetails?.userId}`,{},{withCredentials:true}).then((res)=>{
      res?.status === 200 ?  setAccess(true) :  setAccess(false)
    }).catch(err=>{
        setAccess(false)
    })
  }

  function compClick(e,Name){
   e.preventDefault();
    setShow(true)
    setOpenWindow(Name)

  }
  const dynamicComponent = () => {
    switch (openWindow) {
      case 'UserManagement':
        return <UserManagement showUsers={true} />;
      case 'HotelManagement':
        return <HotelManagement showHotels={true} />;
      case 'RoomManagement':
        return <RoomManagement showRooms={true} />;
      case 'BookingsManagement':
        return <BookingsManagement showBookings={true} />;
      case 'CreateHotel':
        return <CreateHotel showHotelCreation={true} setShow={setShow} />;
      case 'CreateRoom':
        return <CreateRoom showRoomCreation={true} setShow={setShow} />;
        case 'CreateCoupen':
        return <CreateCoupen showCoupenCreation={true} setShow={setShow} />;
        case 'ViewCoupen':
          return <ViewCoupens showViewCoupen={true} setShow={setShow} />;
      default:
        return null;
    }
  };


 function handlelogout(e){
     e.preventDefault()
     axios.post(`http://localhost:3000/clearCookie?userId=${adminDetails?.userId}`,'',{withCredentials:true}).then(()=>{
                localStorage.clear()
                navigate('/adminLogin')
                dispatch(storeAdmin(null))
               }).catch(err=>console.log(err))
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
              <div className="icon-name1">inbox
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
              <div className="big-inbox">Get Your Room </div>
            </div>
            <div className="profile2">
              {/* <img src="https://www.seekclipart.com/clipng/middle/103-1032140_graphic-transparent-1-vector-flat-small-user-icon.png" alt="Profile" /> */}
             
              <div className="icon-name5" style={{cursor:'pointer'}} onClick={handlelogout}>log out</div>
            </div>
          </div>
          <hr className="new-hr" />
          <div className="right-bottom">
           
            <div className="middle-buttons">
              <div className="buttons">
                <button className="new button" onClick={()=>{setShow(false)}}> 
                 Back
                </button>
                {/* <button className="new button"> 
                  <img src="https://i.ibb.co/L60Yr87/eye.png" alt="Eye" />
                </button>
                <button className="new button"> 
                  <img src="https://i.ibb.co/Lv6TqBG/waste-bin.png" alt="Waste Bin" />
                </button> */}
              </div>
              <div className="form has-search">
                <input className="text" type="search" placeholder="Search here..." name="search" />
                <span className="searchIcon">
                  <img src="https://i.ibb.co/sqFgRq8/search.png" alt="Search" />
                </span>
              </div>
            </div>
            
          </div>
        </div>
        {/* Content of the right-body */}
                {
                  show ? (
                    <div>
                    {dynamicComponent()}
                    </div>
                  ) : (
                    <div className='columnContainer1'>
                      <main>
                        <div className="columnContainer" >
                          <UserManagement compClick={compClick}/>
                          <HotelManagement  compClick={compClick}/>
                          <RoomManagement  compClick={compClick}/>
                          <BookingsManagement  compClick={compClick}/>
                        </div>
                        <div className="columnContainer" >
                         
                          <CreateHotel compClick={compClick}/> 
                          <CreateRoom compClick={compClick}/>
                          <CreateCoupen compClick={compClick}/>
                          <ViewCoupens compClick={compClick} />
                
                        </div>
                      
                        <div className="fixed-action-btn click-to-toggle" style={{ bottom: '45px', right: '24px' }}>
                          <ul>
                            {/* Repeat the rest of the list items here */}
                          </ul>
                        </div>
                      </main>
                    </div>
                  )
                }


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
