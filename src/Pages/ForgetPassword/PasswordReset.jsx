import React from 'react';
import '../Login/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenRequest } from '../token';
import { useDispatch } from 'react-redux';
import {storeUser} from '../../Redux/loginSlice.js'

const PasswordReset = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    let getValue = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

    }

    //handle signup function
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await tokenRequest.post('/auth/login',userData,{withCredentials:true}).then((response) => {
            console.log(response);
            dispatch(storeUser(response.data._id))
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
                            <input type="password" name="email" id="email" className="input-field" placeholder="Enter New Password"  onChange={getValue}/>
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Confirm New Password</label>
                            <input type="password" name="password" id="password" className="input-field" placeholder="Confirm New Password"   onChange={getValue}/>
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
