import { userModels } from '../../models/usuarios/userModels.js';
import {z} from 'zod';
import jwt from 'jsonwebtoken';
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

export async function checkUserExist(req, res){
    try {
        const username = req.params.id;
        const user = await reqDB.checkUserExist(username);
        if (user.success) {
            res.status(200).json({ exists: false });
        } else {
            res.status(409).json({ exists: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export async function checkEmailExist(req, res){
    try {
        const email = req.params.email;
        const user = await reqDB.checkEmailExist(email);
        if (user.success) {
            res.status(200).json({ exists: false });
        } else {
            res.status(409).json({ exists: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
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

export async function authUser(req, res){
    try {
        const schema = z.object({
            username: z.string(),
            password: z.string()
        })
        const data = schema.parse(req.body)
        const user = await reqDB.authUser(data)
        if (user.success) {
            try {
                const token = jwt.sign({ id: user.data.id, leveluser: user.data.leveluser, username: user.data.username }, process.env.JWT_SECRET, {expiresIn: '1h'})
                res.status(200).json({message: 'Usuário autenticado!', leveluser: user.data.leveluser, token: token, username: user.data.username})
            } catch (error) {
                res.status(500).json({message: error.message})
            }
        } else {
            res.status(401).json({message: 'Usuário não autenticado!'})
        }
    } catch (error) {
        res.status(400).json({message: error.errors})
    }
}
