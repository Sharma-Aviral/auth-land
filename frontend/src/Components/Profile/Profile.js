import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import './Profile.css';
import store from 'store';


function Profile(props) {
    // useEffect(() => {
    //     if(store.get('user') && !isEmpty(store.get('user'))) {
    //         const user = store.get('user');
    //         const token = store.get('token');
    //         props.setCurrentUser(user);
    //         props.setToken(token);
    //     }
    // }, []);

    return (
        <div className="mainContainer">
            {console.log(props.currentUser)}

            {props.currentUser ? 
            <>
                {!props.currentUser ? <Navigate to="/signin" /> : null}

                <div class="mainHeading">
                    Hi, {props.currentUser.firstName} 🙂
                </div>

                {!props.currentUser.isPhoneVerified ? <div className='verification'>
                    Mobile Verified : ❌
                    <Link to="/verify/phone">Verify Now</Link>
                </div> : null}

                {!props.currentUser.isEmailVerified ? <div className='verification'>
                    Email Verified: ❌
                    <Link to="/verify/email">Verify Now</Link>
                </div> : null}

                {props.currentUser.isEmailVerified && props.currentUser.isPhoneVerified ? <div>
                    You are a verified user.

                    Here is your amazing wallpaper
                    <div className="imageContainer">
                        <img src="https://source.unsplash.com/random/?nature" alt="image" />
                    </div>
                </div> : <>Verify now, your amazing wallpapers are waiting for you.</>}
            </> : <>Project on study and Implementation of Authentication methods</>
        }
        </div>
    )
}

export default Profile
