import { userModels } from '../../models/usuarios/userModels.js';
import {z} from 'zod';
const reqDB = new userModels()
export async function listUser(req, res){
    try {
        const users = await reqDB.listUser()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export async function listUserbyId(req, res){
    try {
        const id = req.params.id
        const user = await reqDB.listUserbyId(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


export async function checkEmailExist(req, res){
    try {
        const email = req.params

        const user = await reqDB.checkEmailExist(email)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export async function createUser(req, res){
    try{
        const schema = z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })
        const data = schema.parse(req.body)

        const newUser = await reqDB.createUser(data)
        res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}
