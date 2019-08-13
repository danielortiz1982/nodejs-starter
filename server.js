const express   = require('express')
const chalk     = require('chalk')
const path      = require('path')
const fs        = require('fs')
const server    = express()
const PORT      = 4500

const ServerMessage = `Nodejs starter project is running on localhost:${PORT}`
require('./utilities/db-connect')

const Pages = require('./models/pages')

const pub = path.join(__dirname, '/public/templates')
server.use(express.static(pub))
server.use(express.json())

/////////////////////////////////////////////////////////////////   Template API   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// Post new page

server.post('/api/v1/pages', async (req, res) => {
  const page = new Pages(req.body)
  try{
    await page.save()
    res.status(201).send(page)  
  }catch(e){
    res.status(400).send(e)
  }
})

////// Get All Pages

server.get('/api/v1/pages', async (req, res) => {
  try{
    const pages = await Pages.find()
    res.status(200).send(pages)
  }catch(e){
    res.status(400).send(e)
  }
})


server.get('/api/v1/pages/:id', async (req, res) => {
  const _id = req.params.id

  try{
    const page = await Pages.findById(_id)
    res.status(200).send(page)

  }catch(e){
    res.status(400).send(e)
  }

})

server.delete('/api/v1/pages/:id', async (req, res) => {
  const _id = req.params.id

  try{
    const page = await Pages.findByIdAndRemove(_id)
    res.status(201).send(page)
  }catch(e){
    res.status(400).send(e)
  }

})

server.put('/api/v1/pages/:id', async (req, res) => {

  const _id = req.params.id

  try{
    const page = await Pages.findByIdAndUpdate(_id, req.body)
    res.status(201).send(page)
  }catch(e){
    res.status(400).send(e)
  }

})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get('/', (req, res)=>{
  res.status(200).send(`Nodejs Starter`)
})

server.listen(PORT, ()=>{
    return console.log(chalk.blue(ServerMessage))
})