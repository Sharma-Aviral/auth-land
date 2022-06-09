const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const error = require('../../../utils/error');
const { nanoid } = require('nanoid');

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
    const { tokenId } = req.body;

    const googleUser = await client.verifyIdToken({idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID}).catch((err) => {
        return res.status(403).json(error(["invalid token"]));
    });

    if(googleUser.payload.email_verified) {
        const emailCheck = await User.find({'email': googleUser.payload.email});

        if(_.isEmpty(emailCheck)) {
            // generating some random password
            let randomPassword = googleUser.payload.email + nanoid();
            // encrypting the password
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(randomPassword, salt);

            const signupBody = {
                firstName: googleUser.payload.given_name,
                lastName: googleUser.payload.family_name,
                email: googleUser.payload.email,
                signUpMethod: 'google',
                password: password,
            }

            let user = new User(signupBody);

    

            await user.save();

            const token = user.generateAuthToken();
            res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});
            
            user = await User.findById(user._id);

            let response = {
                message: `Created new user: ${user._id}`,
                token: token,
                response: _.omit(user.toObject(), ['password', 'roles.client.user', 'roles.freelancer.user'])
            };

            return res.json(response);
        } else {
          
            let user = await User.findOne({email : googleUser.payload.email});

            if(!user) return res.status(404).json(error(["invalid username or password"]));
                
            const token = user.generateAuthToken();
        
            res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});
    
        
            user.save();

            let response = {};
            response.message = `Successful login`;
            response.token = token;
            response.response = _.omit(user.toObject(), ['password', 'roles.client.user', 'roles.freelancer.user']);
                
            res.json(response);
        }
    }
}
