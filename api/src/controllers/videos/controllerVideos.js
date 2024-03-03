import {modelVideos} from '../../models/videos/modelVideos.js';
import {z} from 'zod'

const videoManipulation = new modelVideos()

export async function listVideo(req, res){
    try {
        const id = req.params.id 
        const videos = await videoManipulation.listVideo(id)
        res.status(200).json(videos)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export async function createVideo(req, res){
    try {
        const createUserSchema = z.object({
            title: z.string(),
            description: z.string(),
            duration: z.number(),
            zone: z.string()
        });

        const data = req.body;

        try {
            // Validar os dados usando o esquema Zod
            const validatedData = createUserSchema.parse(data);
            // Se passar pela validação, prosseguir com a criação do vídeo
            const video = await videoManipulation.createVideo(validatedData);
            res.status(201).json(video);
        } catch (validationError) {
            // Se ocorrer um erro de validação, retornar uma resposta 400 com a mensagem de erro
            res.status(400).json({ message: 'Dados inválidos!', error: validationError.errors });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export async function deleteVideo(req, res){
    try {
        const id = req.params
        const video = await videoManipulation.deleteVideo(id)
        res.status(200).json(video)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export async function editVideo(req, res){
    try{
        const editUserSchema = z.object({
            title: z.string(),
            description: z.string(),
            duration: z.number(),
            zone: z.string()
        });

        const data = req.body;
        const id = req.params;

        try {
            // Validar os dados usando o esquema Zod
            const validatedData = editUserSchema.parse(data);
            // Se passar pela validação, prosseguir com a edição do vídeo
            const video = await videoManipulation.editVideo(validatedData, id);
            res.status(200).json(video);
        } catch (validationError) {
            // Se ocorrer um erro de validação, retornar uma resposta 400 com a mensagem de erro
            res.status(400).json({ message: 'Dados inválidos!', error: validationError.errors });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}