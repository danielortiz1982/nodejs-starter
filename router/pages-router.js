const express   = require('express')
PageRouter          = new express.Router()

// Pages Model
const Pages = require('../models/pages')

////// Post new page
PageRouter.post('/api/v1/pages', async (req, res) => {
    const page = new Pages(req.body)
    try{
      await page.save()
      res.status(201).send(page)  
    }catch(e){
      res.status(400).send(e)
    }
  })
  
  ////// Get All Pages
  PageRouter.get('/api/v1/pages', async (req, res) => {
    try{
      const pages = await Pages.find()
      res.status(200).send(pages)
    }catch(e){
      res.status(400).send(e)
    }
  })
  
  ////// Get Single Page By ID
  PageRouter.get('/api/v1/pages/:id', async (req, res) => {
    const _id = req.params.id
  
    try{
      const page = await Pages.findById(_id)
      res.status(200).send(page)
  
    }catch(e){
      res.status(400).send(e)
    }
  })
  
  ////// Delete/Remove Single Page By ID
  PageRouter.delete('/api/v1/pages/:id', async (req, res) => {
    const _id = req.params.id
  
    try{
      const page = await Pages.findByIdAndRemove(_id)
      res.status(201).send(page)
    }catch(e){
      res.status(400).send(e)
    }
  })
  
  ////// Update Single Page By ID
  PageRouter.put('/api/v1/pages/:id', async (req, res) => {
  
    const _id = req.params.id
  
    try{
      const page = await Pages.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
      res.status(201).send(page)
    }catch(e){
      res.status(400).send(e)
    }
  
  })

module.exports = PageRouter