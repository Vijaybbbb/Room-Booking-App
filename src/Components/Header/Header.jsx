import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className='header'>
       <div className='headerContainer'>
     <div className="headerList">
       <div className="headerListItem active">
       <FontAwesomeIcon icon={faBed}/>
       <span>Stays</span>
       </div>
       
       <div className="headerListItem">
       <FontAwesomeIcon icon={faPlane}/>
       <span>Flights</span>
       </div>
       <div className="headerListItem">
       <FontAwesomeIcon icon={faCar}/>
       <span>Car Rentals</span>
       </div>
       <div className="headerListItem">
       <FontAwesomeIcon icon={faBed}/>
       <span>Attrations</span>
       </div>
       <div className="headerListItem">
       <FontAwesomeIcon icon={faTaxi}/>
       <span>Airport Taxis</span>
       </div>
     </div>

     <h1 className='headerTitle'>A lifetime of discounts ? its Genius.</h1>
     <p className='headerDesc'>
      Get rewarded for your travels - unlocks savings of 10 % or with a free booking account
     </p>
     <button className='headerBtn'>Sign in / Register</button>
     <div className="headerSearch">
        <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
            <input 
            type="text"
            placeholder='Where are you going ? '
            className='headerSearchInput' 
          />
        </div>
     

   
        <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
            <span className='headerSearchText'>
              date to date
            </span>
        </div>
     

     
           <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
            <span className='headerSearchText'>
              2 adult 2 childeren
            </span>
            
            </div>

            <div className="headerSearchItem">
            <button className='headerBtn'>Search</button>
            </div>
     </div>
     </div>
    </div>
  )
}

export default Header
