import express from 'express';
import {createUser, listUser} from '../controllers/testeController.js'
const router = express.Router();

router.get('/listar', listUser);
router.post('/criar', createUser);

export default router;

