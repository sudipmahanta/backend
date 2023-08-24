const jwt = require('jsonwebtoken');

exports.verifyWebToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
      });   
}