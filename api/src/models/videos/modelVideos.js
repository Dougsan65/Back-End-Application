import { sql } from '../../config/database.js';
import { randomUUID } from 'crypto';

export class modelVideos{
    async createVideo(data) {
        try {
            const id = randomUUID();
            await sql`INSERT INTO videos (id, title, description, duration, zone) VALUES (${id}, ${data.title}, ${data.description}, ${data.duration}, ${data.zone})`;
            console.log('Create Model')
            return { success: true, message: 'Vídeo criado com sucesso!' }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async listVideo(params){
        try{
            if (params === undefined) {
                const videos = await sql`SELECT * FROM videos`;
                console.log('List all Model')
                return videos
            }else{
                const videos = await sql`SELECT * FROM videos WHERE id = ${params}`;
                console.log('List with where Model')
                return videos
            }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async deleteVideo(data){
        if (data.id === undefined) {
            return { success: false, message: 'Id não informado!' }
        }
        try{
            const a = await sql`DELETE FROM videos WHERE id = ${data.id}`;
            if (a.count === 0) {
                return { success: false, message: 'Vídeo não encontrado!' }
            }
            console.log('Delete Model')
            
            return { success: true, message: 'Vídeo deletado com sucesso!' }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async editVideo(data, id){
        if (id === undefined) {
            return { success: false, message: 'Id não informado!' }
        }
        try{
            const response = await sql`UPDATE videos SET title = ${data.title}, description = ${data.description}, duration = ${data.duration}, zone = ${data.zone} WHERE id = ${id.id}`;
            console.log('Edit Model')
            if (response.count === 0) {
                return { success: false, message: 'Vídeo não encontrado!' }
            }
            return { success: true, message: 'Vídeo editado com sucesso!' }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
}