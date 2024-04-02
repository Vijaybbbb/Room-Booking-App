import React, { useEffect, useState } from 'react';
import '../Login/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    let getValue = (e) => {
        e.preventDefault()
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

    }

    //handle signup function
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await axios.post('http://localhost:3000/auth/register', userData).then((response) => {
          setMessage(response.data.message)
          navigate(`/otp?${userData.email}`)
         
        }).catch(err => setMessage('Error'))

    }



    return (
        <main className="mainLogin">
            <div className="containerLogin">
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Sign Up</h1>
                        <p className="text text-normal">New user? <span><a href="#" className="text text-links"></a></span></p>
                    </div>
                    <form name="signin" className="formLogin" onSubmit={handleSignUp}>
                        <div className="input-control">
                            <label htmlFor="" className="input-label" hidden>UserName</label>
                            <input type="text" name="username" id="email" className="input-field" placeholder="UserName" onChange={getValue} />
                        </div>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden >Email Address</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="Email Address" onChange={getValue} />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden >Password</label>
                            <input type="password" name="password" id="password" className="input-field" placeholder="Password" onChange={getValue} />
                        </div>
                        <div className="input-control">
                            <a href="#" className="text text-links" onClick={()=>{navigate('/login')}}>Already a user</a>
                            <button type="submit" name="submit" id="input-submit">Sign Up</button>
                        </div>
                    </form>
                    <div className={message=='User Hasbeen created' ? 'loginMessage2' : message=='Mail Already Exists' ? 'loginMessage' : 'hidden'}>
                        {message && (<span style={{ marginLeft: '10px' }}>{message}</span>)}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SignUp;
