import express from 'express';
import {createVideo, listVideo, deleteVideo, editVideo} from '../../controllers/videos/controllerVideos.js'
const router = express.Router();

router.get('/listar/:id?', listVideo);
router.post('/criar', createVideo);
router.delete('/deletar/:id', deleteVideo);
router.put('/editar/:id', editVideo);

export default router;