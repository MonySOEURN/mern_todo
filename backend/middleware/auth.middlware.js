const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token);

    // check header
    if(!token){
        res.status(401).json({msg: 'No token, authorization denies!'})
    }
    try {
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // add user from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({msg: "token is not valid!"+error});
    }
}

module.exports = auth;