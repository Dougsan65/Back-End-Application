import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const admAuth = (req, res, next) => {
    
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        }
        if (decoded.leveluser !== 1) {
            next();
        }else{
            return res.status(403).json({ auth: false, message: 'User not authorized.' });
        }
    });
}

export { admAuth };