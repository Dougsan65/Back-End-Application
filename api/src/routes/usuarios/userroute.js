import express from 'express';
import {listUser, createUser, checkEmailExist, listUserbyId} from '../../controllers/usuarios/userController.js'

const router = express.Router();

router.get('/listarUsuarios', listUser);
router.get('/listarUsuarios/:id', listUserbyId);
router.post('/criarUsuario', createUser);
router.get('/checkEmailExist/:email', checkEmailExist);

export default router;
