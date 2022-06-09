const express = require('express');

let router = express.Router();

const { signup, signin, signout } = require('../controllers/auth');

const { googleAuth } = require('../controllers/auth/social/google');

router.post('/signup', signup);
router.post('/signin', signin);

router.post('/signout', signout);

// social

router.post('/social/google', googleAuth);

module.exports = router;