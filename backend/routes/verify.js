const express = require('express');
let router = express.Router();

const isSignedIn = require('../middleware/isSignedIn');

const {sendOtpOnPhone, verifyOtpPhone, sendOtpOnEmail, verifyOtpEmail} = require('../controllers/verify');

router.get('/phone/send', isSignedIn, sendOtpOnPhone);
router.post('/phone', isSignedIn, verifyOtpPhone);

router.get('/email/send', isSignedIn, sendOtpOnEmail);
router.post('/email', isSignedIn, verifyOtpEmail);

module.exports = router;