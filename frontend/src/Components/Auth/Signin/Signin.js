import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
// import { Redirect } from 'react-router';
import axios from 'axios';
import store from 'store';

import { GoogleLogin } from 'react-google-login';
import toast from 'react-hot-toast';

import './signin.css';

function Signin(props) {
    const [signinData, setSigninData] = useState({});
    const [redirect, setRedirect] = useState(false);

    const handleSigninInput = (key, value) => {
        setSigninData({...signinData, [key] : value});
    }
    
    const handleSigninSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/signin', signinData)
          .then(function (response) {
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setCurrentUser(response.data.response);
            props.setToken(response.data.token);
            setRedirect(true);
            console.log(response);
            toast.success('Welcome back! 👋')
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Oops, something went wrong :(")
          });
    }


    const googleSuccessHandler = (response) => {
        axios.post('http://localhost:5000/api/auth/social/google', {
        tokenId: response.tokenId
        })
        .then(function (response) {
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setCurrentUser(response.data.response);
            props.setToken(response.data.token);
            console.log(response);
            toast.success('Welcome 👋')
            setRedirect(true);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const googleFailureHandler = (response) => {
        console.log(response);
        toast.error("Oops, something went wrong :(")
    } 

    return (
        <div class="formContainer">
            <h3 class="authPageHeading">Sign in</h3>

            <form class="signinForm" onSubmit={handleSigninSubmit}>

                <div class="formGroup">
                    <div class="fieldTitle">Email</div>

                    <input class="input" type="email" name="email" onChange={(e) => {handleSigninInput("email", e.target.value)}} required></input>
                </div>

                <div class="formGroup">
                    <div class="fieldTitle">Password</div>

                    <input type="password" name="password" onChange={(e) => {handleSigninInput("password", e.target.value)}} required></input>
                </div>

                <button class="submitBtn" type="submit">Sign in</button>
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

            <div class="authMeta">Not Registered? <Link to="/signup">Create an account!</Link></div>

            {redirect || props.currentUser ? <Navigate to='/profile' /> : null}
        </div>
    )
}

export default Signin;
