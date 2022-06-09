import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import axios from 'axios';
import store from 'store';

import '../Signin/signin.css';

import { GoogleLogin } from 'react-google-login';
import toast, { Toaster } from 'react-hot-toast';



function Signup(props) {
    const [signupData, setSignupData] = useState({});
    const [redirect, setRedirect] = useState(false);


    const handleSignupInput = (key, value) => {
        setSignupData({...signupData, [key] : value});
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/signup', signupData)
          .then(function (response) {
            console.log(response);
            setRedirect(true);
            props.setCurrentUser(response.data.response);
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setToken(response.data.token);
            toast.success('Welcome!👋')
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Oops, something went wrong :(")
          });
    }

    const googleSuccessHandler = (response) => {
        console.log('i am on')
        axios.post('http://localhost:5000/api/auth/social/google', {
        tokenId: response.tokenId
        })
        .then(function (response) {
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setToken(response.data.token);
            props.setCurrentUser(response.data.response);
            setRedirect(true);
            console.log(response);
            toast.success('Welcome! 👋')
        })
        .catch(function (error) {
            console.log(error);
            toast.error("Oops, something went wrong :(")
        });
    }

    const googleFailureHandler = (response) => {
        console.log(response);
        toast.error("Oops, something went wrong :(")
    } 


    return (
        <div className='formContainer'>
            <h3 className="authPageHeading">Sign up</h3>

            <form className='signinForm' onSubmit={handleSignupSubmit}>

                <div class="formGroup">
                    <div class="fieldTitle">First Name:</div>
                    <input
                    type="text" class="input" name="firstName" onChange={(e) => {handleSignupInput("firstName", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Last Name</div>
                    <input
                    type="text" class="input" name="lastName" onChange={(e) => {handleSignupInput("lastName", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Email</div>
                    <input
                    type="text" class="input" name="email" onChange={(e) => {handleSignupInput("email", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Country code</div>
                    <input
                    type="text" class="input" name="countryCode" onChange={(e) => {handleSignupInput("countryCode", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Phone</div>
                    <input
                    type="text" class="input" name="phone" onChange={(e) => {handleSignupInput("phone", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Password</div>
                    <input
                    type="password" class="input" name="password" onChange={(e) => {handleSignupInput("password", e.target.value)}} required></input>
                </div>

                <button class="submitBtn" type="submit">Create an account</button>
            </form>

            <div className="social">
                    <GoogleLogin
            clientId="563906712839-d9gpl2u091hemcpncbqtcjm9lrogp1mv.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={googleSuccessHandler}
            onFailure={googleFailureHandler}
            cookiePolicy={'single_host_origin'}
            />
            </div>


            <div class="authMeta">Already have an account? <Link to="/signin">Sign in now!</Link></div>

            {redirect || props.currentUser ? <Navigate to='/profile' /> : null}
        </div>
    )
}

export default Signup
