import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
// import { Redirect } from 'react-router';
import axios from 'axios';
import store from 'store';

import toast, { Toaster } from 'react-hot-toast';

import '../../Signin/signin.css';
function Phone(props) {
    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState({});
    const [redirect, setRedirect] = useState(false);

    const handleOtpSend = () => {
        console.log("I ran");
        axios.get('http://localhost:5000/api/verify/phone/send', {
            headers: {
                "Authorization": 'Bearer ' + props.token
            }
        }).then(function (response) {
              console.log(response);
              toast.success("OTP sent to your mobile.")
            setOtpSend(true);
          }).catch(function (error) {
            console.log(error);
            toast.error("Oops, something went wrong :(")
          });
    }

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/verify/phone', otp, {
            headers: {
                "Authorization": 'Bearer ' + props.token
            }
        })
          .then(function (response) {
              console.log(response);
            store.set('user', response.data.response);
            store.set('token', response.data.token);
            props.setCurrentUser(response.data.response);
            props.setToken(response.data.token);
            console.log(response);
            toast.success('Mobile number verified successfully')
            setRedirect(true);
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Oops, something went wrong :(")
          });
    }

    const handleOtpInput = (key, value) => {
        setOtp({...otp, [key]: value})
    }

    return (
    <div class="formContainer">
        <h3 class="authPageHeading">Phone verification</h3>

        <button onClick={handleOtpSend}>Send OTP</button>

        <form class="signinForm" onSubmit={handleOtpSubmit}>

            <div class="formGroup">
                <div class="fieldTitle">Verification code</div>

                <input disabled={!otpSend} class="input" type="text" name="otp" onChange={(e) => {handleOtpInput("otp", e.target.value)}} required></input>
            </div>

            <button class="submitBtn" type="submit">Verify now</button>

            {redirect ? <Navigate to='/profile' /> : null}
            {!props.currentUser ? <Navigate to='/signin' /> : null}
        </form>
    </div>
    )
}

export default Phone
