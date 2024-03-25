import { PrismaClient } from '@prisma/client';

import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export class userModels {
    async createUser(data) {
        try {
            const newId = randomUUID();
            const curretDate = new Date();
            await prisma.usuariosregistrados.create({
                data: {
                    curretDate,
                    id: newId,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    leveluser: 1,
                },
            });
            console.log('Create Model');
            return {
                success: true,
                message: 'Usuário criado com sucesso!',
                data: {
                    id: newId,
                    name: data.username,
                    password: data.password,
                },
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async listUser() {
        try {
            const users = await prisma.usuariosregistrados.findMany();
            console.log('List Model');
            return users;
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async checkUserExist(id) {
        try {
            const user = await prisma.usuariosregistrados.findMany({
                where: { username: id },
            });
            console.log(user);
            if (user.length > 0) {
                return { success: false, message: 'Usuário encontrado!' };
            } else {
                return { success: true, message: 'Usuário não encontrado!' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async checkEmailExist(email) {
        try {
            const user = await prisma.usuariosregistrados.findMany({
                where: { email: email },
            });
            if (user.length > 0) {
                return { success: false, message: 'Email já cadastrado!' };
            } else {
                return { success: true, message: 'Email disponível!' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async authUser(data) {
        try {
            const user = await prisma.usuariosregistrados.findMany({
                where: { username: data.username, password: data.password },
            });
            if (user.length > 0) {
                return {
                    success: true,
                    data: {
                        leveluser: user[0].leveluser,
                        username: user[0].username,
                        id: user[0].id,
                    },
                };
            } else {
                return { success: false };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
