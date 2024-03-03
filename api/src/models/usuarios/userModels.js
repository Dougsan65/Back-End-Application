import { sql } from '../../config/database.js';
import { randomUUID } from 'crypto';

export class userModels{

    async createUser(data) {
        try {
            const newId = randomUUID();
            const curretDate = new Date();
            await sql`INSERT INTO usuariosregistrados (id, username, email, password, datecreated, leveluser) VALUES (${newId}, ${data.username}, ${data.email},  ${data.password}, ${curretDate}, 1)`;
            console.log('Create Model');
            return { success: true, message: 'Usuário criado com sucesso!', data: { id: newId, name: data.username, password: data.password } };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async listUser(){
        try{
            const users = await sql`SELECT * FROM usuariosregistrados`;
            console.log('List Model')
            return users
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async listUserbyId(id){
        try{
            const user = await sql`SELECT * FROM usuariosregistrados WHERE id = ${id}`;
            console.log('List Model')
            console.log(user)
            return user
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async checkEmailExist(email){
        try{
            const user = await sql`SELECT email FROM usuariosregistrados WHERE email = ${email.email}`;
            return user
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    

}
