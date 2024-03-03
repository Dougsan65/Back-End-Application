import express from 'express';
import {listUser, createUser, checkEmailExist, checkUserExist} from '../../controllers/usuarios/userController.js'

const router = express.Router();

router.post('/criarUsuario', createUser);

router.get('/listarUsuarios', listUser);
router.get('/checkUserExist/:id', checkUserExist);
router.get('/checkEmailExist/:email', checkEmailExist);

export default router;
