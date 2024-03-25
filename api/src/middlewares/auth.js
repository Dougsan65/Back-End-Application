import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res
            .status(401)
            .json({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res
                .status(500)
                .json({
                    auth: false,
                    message: 'Failed to authenticate token.',
                });
        }
        req.userData = {
            id: decoded.id,
            leveluser: decoded.leveluser,
            username: decoded.username,
        };
        next();
    });
};

export { auth };
