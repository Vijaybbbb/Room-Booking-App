import React from 'react'
import './MailList.css'

const MailList = ({profile}) => {
  return (
    <div  className='mail'>
      {
        profile ? (
          <div >
              <h1 className="mailTitle" style={{ marginLeft: '-24px' }}>Save  time , save money</h1>
              <span className="mailDesc" style={{ marginLeft: '29px' }}>Signup and we'll send the best deals to you </span>


            </div>
        ):(
            <div>
              <h1 className="mailTitle">Save  time , save money</h1>
              <span className="mailDesc" >Signup and we'll send the best deals to you </span>
              <div className="mailInputContainer">
                <input type="text" placeholder='Your Email' />
                <button>Subscribe</button>
              </div>

            </div>
        )
      }
    </div>
  )
}

export default MailList
