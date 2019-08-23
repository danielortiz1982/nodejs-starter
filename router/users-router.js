const express   = require('express')
const multer    = require('multer')
const fs        = require('fs')
const bcrypt = require('bcrypt')
const saltRounds = 7
UserRouter      = new express.Router()
const UserModel = require('../models/users')

UserRouter.post('/api/v1/users', (req, res) => {
    const user = new UserModel(req.body)
    let userPassword = user.password
    bcrypt.hash(userPassword, saltRounds, async (error, hash) => {
        user.password = hash
        try{
            await user.save()
            res.status(201).send(user)
        }catch(e){
            res.status(400).send(e)
        }
    })
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


// TODO Clean up image upload and store path to image in user document. 

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

      cb(null, 'public/images/avatar')
    },

    filename:  (req, file, cb) => {
        
        let fileExt = file.mimetype.split('/')

        console.log(fileExt[1])

      cb(null, file.fieldname + '-' + Date.now() + '.' + fileExt[1])

    }

  })
  
  const upload = multer({ storage })


UserRouter.post('/api/v1/users/avatar', upload.single('upload'), (req, res) => {

    res.send('user img sent!')

})

module.exports = UserRouter