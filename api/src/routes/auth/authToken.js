import express from 'express';
import { auth } from '../../middlewares/auth.js';
import { admAuth } from '../../middlewares/admAuth.js';
const router = express.Router();

router.get('/verifyToken', auth, (req, res) => {
    const a = req.userData.id;
    res.status(200).json({message: 'Token is valid', id: a})
});

router.get('/verifyTokenAdm', admAuth, (req, res) => {
    res.status(200).json({message: 'Token is valid'})
});

export default router;