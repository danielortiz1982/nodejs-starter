const express         = require('express')
const chalk           = require('chalk')
const path            = require('path')
const server          = express()
const PORT            = process.env.port || 4500
const PageRouter      = require('./router/pages-router')
const UserRouter      = require('./router/users-router')
const ServerMessage   = `Nodejs starter project is running on localhost:${PORT}`
const db              = require('./utilities/db-connect')
const pub             = `${__dirname}/public/`

server.use(express.static(pub))
server.use(express.json())

////////////////////////////////////////////////////////////////////////  API Router  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pages API Router
server.use(PageRouter)

// Users API Router
server.use(UserRouter)


///////////////////////////////////////////////////////////////////////////////   Template Routes   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get('/', (req, res)=>{
  res.status(200).sendFile('index.html')
})

server.get('/sign-up', (req, res)=>{
  res.status(200).sendFile(`${pub}templates/sign-up.html`)
})

server.get('/users', (req, res)=>{
  res.status(200).sendFile(`${pub}templates/users.html`)
})

server.get('/user/:id', (req, res)=>{
  res.status(200).sendFile(`${pub}templates/user.html`)
})

server.get('*', (req, res)=>{
  res.status(404).sendFile(`${pub}templates/404.html`)
})

server.listen(PORT, ()=>{
    return console.log(chalk.blue(ServerMessage))
})