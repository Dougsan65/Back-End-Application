import {modelVideos} from '../../models/videos/modelVideos.js';

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
        const data = req.body
        const video = await videoManipulation.createVideo(data)
        res.status(200).json(video)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
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
    try {
        const data = req.body
        const id = req.params
        console.log(data, id)
        const video = await videoManipulation.editVideo(data, id)
        res.status(200).json(video)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}