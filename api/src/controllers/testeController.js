import {testeModel} from '../models/testemodel.js'

const modeloBanco = new testeModel()

export async function createUser(req, res){
    try {
        const data = req.body
        const newUser = await modeloBanco.createUser(data)
        res.status(201).json(newUser)
        
}   catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function listUser(req, res){
    try {
        const users = await modeloBanco.listUser()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}