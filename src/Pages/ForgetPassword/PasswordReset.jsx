import React from 'react';
import '../Login/Login.css'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenRequest } from '../token';
import { useDispatch } from 'react-redux';
import {storeUser} from '../../Redux/loginSlice.js'
import axios from 'axios';

const PasswordReset = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState(location.search.substring(1))
    const [userData, setUserData] = useState({
        newPassword: '',
        confirmnNewPassword: '',
      
    })

    let getValue = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
            email:email
        })

    }

    //handle signup function
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await axios.post('http://localhost:3000/auth/newPasswordSet',userData,{withCredentials:true}).then((response) => {        
            navigate('/')
        }).catch(err =>console.log(err))
    }

    return (
        <main className="mainLogin">
            <div className="containerLogin">
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Password Reset</h1>
                        <p className="text text-normal">New user? <span><a href="#" className="text text-links" onClick={()=>{navigate('/signup')}}>Create an account</a></span></p>
                    </div>
                    <form name="signin" className="formLogin" onSubmit={handleLogin}>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Enter New Password</label>
                            <input type="password" name="newPassword" id="password" className="input-field" placeholder="Enter New Password"  onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Confirm New Password</label>
                            <input type="password" name="confirmnNewPassword" id="password" className="input-field" placeholder="Confirm New Password"   onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            
                            <button type="submit" name="submit" id="input-submit"> Save</button>
                        </div>
                    </form>
                    <div className="striped">
                        <span className="striped-line"></span>
                        <span className="striped-text"></span>
                        <span className="striped-line"></span>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default PasswordReset;
