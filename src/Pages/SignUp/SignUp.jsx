import React, { useState } from 'react';
import '../Login/Login.css'
import axios from 'axios'

const SignUp = () => {

    const [userName,setUsername]  = useState('')        
    const [email,setEmail]  = useState('')        
    const [passwrd,setPassword]  = useState('')        
    const [error,setError] = useState()

    //handle signup function
    const handleSignUp = () =>{
        axios.post('',{
            username:userName,
            email:email,
            password:password
        }).then((response)=>{
            console.log(response);
        }).catch(err => setError(err))
    }

    return (
        <main className="mainLogin">
            <div className="containerLogin">
                <section className="wrapperLogin">
                    <div className="headingLogin">
                        <h1 className="text text-large">Sign Up</h1>
                        <p className="text text-normal">New user? <span><a href="#" className="text text-links">Create an account</a></span></p>
                    </div>
                    <form name="signin" className="formLogin">
                        <div className="input-control">
                            <label htmlFor="" className="input-label" hidden onChange={(e)=>{setUsername(e.target.value)}}>UserName</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="UserName" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden onChange={(e)=>{setEmail(e.target.value)}}>Email Address</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden onChange={(e)=>{setPassword(e.target.value)}}>Password</label>
                            <input type="password" name="password" id="password" className="input-field" placeholder="Password" />
                        </div>
                        <div className="input-control">
                            <a href="#" className="text text-links">Already a user</a>
                            <input type="submit" name="submit" id="input-submit" value="Sign Up" onClick={()=>{handleSignUp}}/>
                        </div>
                    </form>
                    <div className="loginMessage">
                     {
                      error && (<span style={{marginLeft:'10px'}}>Login Failed</span>)
                     }
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SignUp;
