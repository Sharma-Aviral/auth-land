const User = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const error = require('../utils/error');

exports.signup = async (req, res) => {
    const emailCheck = await User.find({'email': req.body.email});

    if(!(_.isEmpty(emailCheck))) return res.status(409).json(error(["email already in use"]));
    
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        countryCode: req.body.countryCode,
        password: req.body.password,
        signUpMethod: 'custom'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});
    
    user = await User.findById(user._id);

    res.json({
        message: `Created new user: ${user._id}`,
        token: token,
        response: _.omit(user.toObject(), ['password'])
    });
}

exports.signin = async (req, res) => {  
    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(404).json(error(["invalid username or password"]));

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(401).json(error(["invalid username or password"]));

    const token = user.generateAuthToken();

    res.cookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});

    res.json({
        message: "Login Successful",
        token: token,
        response: _.omit(user.toObject(), ['password'])
    });
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signout",
        response: {}
    })
}