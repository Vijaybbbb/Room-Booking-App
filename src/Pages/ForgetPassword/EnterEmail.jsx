import React from 'react';
import '../Login/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenRequest } from '../token';
import { useDispatch } from 'react-redux';
import {storeUser} from '../../Redux/loginSlice.js'
import axios from 'axios';

const EnterEmail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [email,setEmail] = useState()

    const getValue = (e) =>{
        setEmail(e.target.value)
        console.log(e.target.value);
    }
    

    //handle signup function
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await axios.post('http://localhost:3000/auth/passwordReset',{email:email},{withCredentials:true}).then((response) => {   
            navigate(`/resetWithOtp?${email}`)
        }).catch(err =>console.log(err))
    }

    return (
        <main className="mainLogin">
            <div className="containerLogin">
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Enter You Email</h1>
                        <p className="text text-normal">Enter Your Email here<span><a href="#" className="text text-links" ></a></span></p>
                    </div>
                    <form name="signin" className="formLogin" onSubmit={handleLogin}>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Enter here</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="Enter here"  onChange={getValue}/>
                        </div>
                       
                        <div className="input-control">
                            
                            <button type="submit" name="submit" id="input-submit"> Send OTP</button>
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

export default EnterEmail;
