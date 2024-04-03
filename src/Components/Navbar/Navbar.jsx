import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = ({access}) => {
  const navigate = useNavigate()
  return (
    <div>
      {!access ? (
    <div className='navbar'>
      <div className="navContainer">
        
        <span className='logo'> logo </span>
        <div className="navItems">
              <button className="navButton" onClick={()=>{navigate('/signup')}}>Register</button>
              <button className="navButton" onClick={()=>{navigate('/login')}}>Login</button>
        </div>
      </div>
    </div>
    ):(
      <div className='navbar'>
      <div className="navContainer">
        
        <span className='logo'> logo </span>
        <div className="navItems">
              <button className="navButton" onClick={()=>{navigate('/')}}>My Bookings</button>
              <button className="navButton" onClick={()=>{navigate('/')}}>Profile</button>
        </div>
      </div>
    </div>
    )}
    </div>
  )
}

export default Navbar
