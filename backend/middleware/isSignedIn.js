const jwt = require('jsonwebtoken');
const error = require('../utils/error');

// checks if user is signed in or not

module.exports = function(req, res, next){
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(401).json(error(["access denied, No token provied by client"]));

    if(authHeader.split(' ')[0] !== 'Bearer') return res.status(400).json(error(["invalid authorization format, Bearer required with token (Bearer <token>)"]));

    const token = authHeader.split(' ')[1];

    try{
        // ! make sure to replace the secret with the secure token
        const decodedToken = jwt.verify(token, "Secret");

        req.user = decodedToken;
        next();
    }catch{
        res.status(400).json(error(["invalid auth token"]));
    }
}