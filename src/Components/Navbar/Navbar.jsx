import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = ({access}) => {

  const navigate = useNavigate()

  return (
    <div>
      {!access ? (
    <div className='navbar'>
      <div className="navContainer">
        <Link to='/' >
        <span className='logo'> Get Your Room </span>
        </Link>
        <div className="navItems">
              <button className="navButton" onClick={()=>{navigate('/signup')}}>Register</button>
              <button className="navButton" onClick={()=>{navigate('/login')}}>Login</button>
        </div>
      </div>
    </div>
    ):(
      <div className='navbar'>
      <div className="navContainer">
        
        <Link  to='/'>
        <span className='logo' > Get Your Room </span>
        </Link>
        <div className="navItems">
              <button className="navButton" onClick={()=>{navigate('/')}}>Create</button>
              <button className="navButton" onClick={()=>{navigate('/myBookings')}}>My Bookings</button>
              <button className="navButton" onClick={()=>{navigate('/')}}>Profile</button>
              <button className="navButton" onClick={async()=>{
               await axios.post('http://localhost:3000/clearCookie','',{withCredentials:true}).then(()=>{
                localStorage.clear()
                navigate('/login')
               }).catch(err=>console.log(err))
               
                }}>LogOut</button>
        </div>
      </div>
    </div>
    )}
    </div>
  )
}

export default Navbar
