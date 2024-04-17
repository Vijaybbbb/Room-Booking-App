import React from 'react'
import '../adminHome/AdminHome.css'

const RoomManagement = ({compClick,showRooms}) => {
  return (
    <div>
    {
      showRooms ? (
        <div>user information</div>
      ):(
        <div className="col s6" onClick={()=>{compClick(event,'RoomManagement')}}>
   <div style={{ padding: '35px' }} align="center" className="card">
     <div className="row">
       <div className="left card-title">
         <b>RoomManagement</b>
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
      )
    }
  </div>
  )
}

export default RoomManagement
