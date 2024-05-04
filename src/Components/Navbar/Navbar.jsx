import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../../Redux/loginSlice';

const Navbar = ({access}) => {

  const navigate = useNavigate()
  const userDetails = useSelector(state => state.userDetails)
  const dispatch = useDispatch()

  return (
    <div>
      {!access ? (
    <div className='navbar'>
      <div className="navContainer">
        <Link to='/' >
        <span className='logo'> Get Your Room</span>
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
              <button className="navButton" onClick={()=>{navigate('/notification')}}>Notifications</button>
              <button className="navButton" onClick={()=>{navigate('/myBookings')}}>My Bookings</button>
              <button className="navButton" onClick={()=>{navigate('/profile')}}>Profile</button>
              <button className="navButton" onClick={async()=>{
               await axios.post(`http://localhost:3000/clearCookie?userId=${userDetails?.userId}`,'',{withCredentials:true}).then(()=>{
                localStorage.clear()
                dispatch(storeUser(null))
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
