const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 32
    },

    lastName: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 32
    },

    email: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
        unique: true
    },

    isPhoneVerified: {
        type: Boolean,
        trim: true,
        default: false
    },

    isEmailVerified: {
        type: Boolean,
        trim: true,
        default: false
    },
    
    phone: {
        type: String,
        trim: true,
        maxLength: 10,
        minLength: 10,
        sparse:true,
        default: null
    },

    countryCode: {
        type: String,
        default: null
    },

    password: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true
    },

    signUpMethod: {
        type: String,
        enum: ['custom', 'google']
    },

}, {timestamps: true});

userSchema.methods.generateAuthToken = function(){
    const payload = {
        _id : this._id,
        firstName : this.firstName,
        lastName: this.lastName,
        country: this.country,
        email: this.email,
        phone: this.phone,
        isPhoneVerified: this.isPhoneVerified,
        isEmailVerified: this.isEmailVerified
    }
    // ! replace secret with secured random token 
    const token = jwt.sign(payload, 'Secret', {expiresIn: '7d'});
    return token;
}


module.exports = mongoose.models.User || mongoose.model("User", userSchema);