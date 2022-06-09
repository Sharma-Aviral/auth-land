import React, { useState } from 'react';

import Signup from '../Components/Auth/Signup/Signup';
import Signin from '../Components/Auth/Signin/Signin';
import axios from 'axios';

function Auth() {
    const [signupData, setSignupData] = useState({});
    const [signinData, setSigninData] = useState({});

    const handleSignupInput = (key, value) => {
        setSignupData({...signupData, [key] : value});
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/signup', signupData)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const handleSigninInput = (key, value) => {
        setSigninData({...signinData, [key] : value});
    }

    const handleSigninSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/signin', signinData)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
            <Signin 
            handleSigninInput={handleSigninInput} 
            handleSigninSubmit={handleSigninSubmit}>
            </Signin>

            <Signup 
            handleSignupInput={ handleSignupInput } 
            handleSignupSubmit={ handleSignupSubmit }>
            </Signup>
        </div>
    )
}

export default Auth
