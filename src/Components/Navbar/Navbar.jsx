import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

import Cookies from 'universal-cookie';
import axios from 'axios';


const Navbar = ({access}) => {

  const cookies = new Cookies();

  const navigate = useNavigate()


  const clearCookie = (name) => {
  try {
    cookies.remove(name, {path: "/", domain: "localhost"});
  } catch (error) {
    console.error('Error clearing cookie:', error);
  }
};

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
              <button className="navButton" onClick={async()=>{
              //  Cookie.remove('access_tocken')
              //  clearCookie('access_tocken');
               await axios.post('http://localhost:3000/clearCookie','',{withCredentials:true}).then(()=>{
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
