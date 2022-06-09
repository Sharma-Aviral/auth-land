import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './header.css';

function Header(props) {
    return (
        <div className="header">
            <div className="title">🔒 Authland</div>
            {props.currentUser ? 
            <div className="userInfo">
                👋 Hello, {props.currentUser.firstName}
                <button onClick={props.signout} className='signoutButton' to="/signout">Signout</button>
            </div> : <div className="loginControls">
                <Link to="/signin">Login</Link>
                <Link to="/signup">Signup</Link>
            </div> 
        }
        {props.signoutRedirect ? <Navigate to="/signin"></Navigate> : null}

        </div>
        
    );
}

export default Header
