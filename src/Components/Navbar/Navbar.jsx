import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <div className="navContainer">
        
        <span className='logo'> logo </span>
        <div className="navItems">
              <button className="navButton" onClick={()=>{navigate('/signup')}}>Register</button>
              <button className="navButton" onClick={()=>{navigate('/login')}}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
