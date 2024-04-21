import React from 'react'
import '../adminHome/AdminHome.css'


const BookingsManagement = ({compClick,showBookings}) => {
  return (
    <div>
    {
      showBookings ? (
        <div>user information</div>
      ):(
            <div className="col s6" onClick={() => { compClick(event, 'BookingsManagement') }}>
              <div style={{ padding: '35px' }} align="center" className="card">
                <div className="row">
                  <div className="left card-title">
                    <b>BookingsManagement</b>
                  </div>
                </div>
               
              </div>
            </div>
      )
    }
  </div>
  )
}

export default BookingsManagement
