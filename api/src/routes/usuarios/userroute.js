import express from 'express';
import { auth } from '../../middlewares/auth.js';
import { admAuth } from '../../middlewares/admAuth.js';
import {
    listUser,
    createUser,
    checkEmailExist,
    checkUserExist,
    authUser,
} from '../../controllers/usuarios/userController.js';

const router = express.Router();

router.post('/criarUsuario', createUser);
router.post('/autenticarUsuario', authUser);
router.get('/listarUsuarios', admAuth, listUser);

router.get('/checkUserExist/:id', checkUserExist);
router.get('/checkEmailExist/:email', checkEmailExist);

export default router;
