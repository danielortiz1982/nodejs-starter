const express   = require('express')
UserRouter      = new express.Router()
const UserModel = require('../models/users')

UserRouter.post('/api/v1/users', async (req, res) => {
    const user = new UserModel(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

UserRouter.get('/api/v1/users', async (req, res) => {
    try{
        const users = await UserModel.find()
        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
})

UserRouter.get('/api/v1/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await UserModel.findById(_id)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

UserRouter.delete('/api/v1/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await UserModel.findByIdAndDelete(_id)
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    } 
})

UserRouter.put('/api/v1/users/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await UserModel.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = UserRouter



