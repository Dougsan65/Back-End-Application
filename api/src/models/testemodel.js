import { sql } from '../config/database.js';
import { randomUUID } from 'crypto';

export class testeModel{

    async createUser(data) {
        try {
            const newId = randomUUID();
            await sql`INSERT INTO users (id, username, password) VALUES (${newId}, ${data.username}, ${data.password})`;
            console.log('Create Model');
            return { success: true, message: 'Usuário criado com sucesso!', data: { id: newId, name: data.username, password: data.password } };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async listUser(){
        try{
            const users = await sql`SELECT * FROM users`;
            console.log('List Model')
            return users
        } catch (error) {
            return { success: false, message: error.message }
        }
    }


}