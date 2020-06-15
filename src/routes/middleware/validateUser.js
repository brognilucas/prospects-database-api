
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let {token} = req.session;
    
    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });

        req.$userCode = decoded.code;
        next();
    });

}