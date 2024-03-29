import React from 'react';
import '../Login/Login.css'

const SignUp = () => {
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
                            <label htmlFor="" className="input-label" hidden>UserName</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="UserName" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email Address</label>
                            <input type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Password</label>
                            <input type="password" name="password" id="password" className="input-field" placeholder="Password" />
                        </div>
                        <div className="input-control">
                            <a href="#" className="text text-links">Forgot Password</a>
                            <input type="submit" name="submit" id="input-submit" value="Sign In"/>
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

export default SignUp;
