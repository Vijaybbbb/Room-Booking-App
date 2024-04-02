import React from 'react';
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

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
        await axios.post('http://localhost:3000/auth/login',userData,{withCredentials:true}).then((response) => {
            console.log(response);
            navigate('/')
        }).catch(err =>console.log(err))
    }

    return (
        <main className="mainLogin">
            <div className="containerLogin">
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Log in</h1>
                        <p className="text text-normal">New user? <span><a href="#" className="text text-links" onClick={()=>{navigate('/signup')}}>Create an account</a></span></p>
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
                            <a href="#" className="text text-links">Forgot Password</a>
                            <button type="submit" name="submit" id="input-submit"> Log in</button>
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

export default Login;
