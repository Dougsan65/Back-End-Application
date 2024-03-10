import { PrismaClient } from '@prisma/client';

import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
export class modelVideos{
    
    async createVideo(data) {
        try {
            const id = randomUUID();
            await prisma.videos.create({
                data: {
                    id: id,
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    zone: data.zone,
                }
            });
            console.log('Create Model')
            return { success: true, message: 'Vídeo criado com sucesso!' }
        } catch (error) {
            console.log(error)
            return { success: false, message: error.message }
        }
    }

    async listVideo(id){
        try {
            let response;
            if (id === undefined || id === null) {
                response = await prisma.videos.findMany();
                console.log(response);
                return { success: true, message: 'Vídeos encontrados com sucesso!', data: response };
            } else {
                response = await prisma.videos.findMany({
                    where: { id: id }
                });
                console.log('List Model');
                if (response.length === 0) {
                    return { success: false, message: 'Vídeo não encontrado!' };
                }
                return { success: true, message: 'Vídeo encontrado com sucesso!', data: response };
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }
    

    async deleteVideo(data){
        if (data.id === undefined) {
            return { success: false, message: 'Id não informado!' }
        }
        try{
            const a = await prisma.videos.delete({
                where: { id: data.id }
            });
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
            const response = await prisma.videos.update({
                where: { id: id },
                data: {
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    zone: data.zone
                }
            });
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