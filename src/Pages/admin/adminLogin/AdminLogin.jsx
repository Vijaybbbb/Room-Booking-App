import React, { useEffect, useState } from 'react'
import '../../Login/Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tokenRequest } from '../../token'
import {storeAdmin} from '../../../Redux/adminLoginSlice'

const AdminLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [successMessage,setSuccessMessage]  = useState()
    const [errorMessage,setErrorMessage] = useState() 
    const adminDetail = useSelector(state => state.adminDetails)
    console.log(adminDetail);
    const  [adminDetails,setAdminDetails] = useState({
       email:null,
       password:null
    }) 


    useEffect(()=>{
        if(adminDetail?.userId){
            navigate('/adminHome')
        }
     
    },[])




    async function handleLogin(e){
       e.preventDefault(); // Prevent default form submission
       await tokenRequest.post('/admin/login',adminDetails,{withCredentials:true}).then((response) => {
           setSuccessMessage(response.data.message)
           dispatch(storeAdmin(response.data._id))
           navigate('/adminHome')
       }).catch()
    }

    function getValue(e){
       setAdminDetails({
              ...adminDetails,
              [e.target.name]: e.target.value
          })
    }


  return (
    <div>
       <main className="mainLogin">
            <div className="containerLogin"> 
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Admin Log in</h1>
                    </div>
                    <form name="signin" className="formLogin" onSubmit={handleLogin}>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email Address</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="Email Address"  onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Password</label>
                            <input type="password" name="password" id="password" className="input-field" placeholder="Password"   onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            <a href="#" className="text text-links" onClick={()=>{navigate('/enterEmail')}}>Forgot Password</a>
                            <button type="submit" name="submit" id="input-submit"> Log in</button>
                        </div>
                    </form>
                    {successMessage &&
                    <div className='loginMessage2'>
                        <span style={{ marginLeft: '10px' }}>{successMessage}</span>
                    </div>
                    }
                    {errorMessage &&
                    <div className='loginMessage'>
                        <span style={{ marginLeft: '10px' }}>{errorMessage}</span>
                    </div>
                    }
                </section>
            </div>
        </main>
    </div>
  )
}

export default AdminLogin
