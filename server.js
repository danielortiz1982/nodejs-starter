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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////// Template Engine //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TemplateEngine = ()=>{

  var fs = require('fs') // this engine requires the fs module

  server.engine('template', function (filePath, options, callback) { // define the template engine

    fs.readFile(filePath, function (err, content) {

      if (err) return callback(err)

      //console.log(options)


      let renderContent = content.toString()
        
      .replace('#message#', options.message)

      .replace('#header#', options.header)

      .replace('#content#', options.content)


      //console.log(rendered)


      return callback(null, renderContent)


    })

  })

  server.set('views', 'public/templates') // specify the views directory

  server.set('view engine', 'template') // register the template engine

}

TemplateEngine()


/////////////////////////////////////////////////////////////////// Template Engine //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




server.get('/', (req, res)=>{
  res.status(200).sendFile('index.html')
})

server.get('/sign-up', (req, res)=>{
  res.status(200).sendFile(`${pub}templates/sign-up.html`)
})

server.get('/users', (req, res)=>{
  res.status(200).sendFile(`${pub}templates/users.html`)
})

server.get('/sample', (req, res)=>{

  const data = [
    {
    phone: 9176051592,
    age: 37,
    _id: "5d97ce5e91b4a90840f1fa53",
    firstName: "daniel",
    lastName: "ortiz",
    email: "danielortiz1982@gmail.com",
    password: "$2b$07$/t7aiKu1Je4/dwp6f33Q5uCNyKZ10UGRLAdhGZSoAIde0eUTWJBR2",
    addresses: [ ],
    __v: 0
    },
    {
    phone: 555555555,
    age: 35,
    _id: "5d97cfc491b4a90840f1fa54",
    firstName: "Hana",
    lastName: "Ortiz",
    email: "hanacodes@gmail.com",
    password: "$2b$07$NmrkbJ/j77WICYTG2mJrPOEM46J.bondd3L6TCMskc7a49j0iEVbq",
    addresses: [ ],
    __v: 0
    },
    {
    phone: 33355512345,
    age: 39,
    _id: "5d97d06a91b4a90840f1fa55",
    firstName: "Steven",
    lastName: "Ortiz",
    email: "stvortiz@gmail.com",
    password: "$2b$07$iF9v2kCovyUzsonNatozb.mPaH6VhHvOOBv9u1SjA9B/b44xIoUr2",
    addresses: [ ],
    __v: 0
    }
    ]

  res.render('sample', {message: 'hello', header: 'header', content: 'this is the content'})
})


server.listen(PORT, ()=>{
    return console.log(chalk.blue(ServerMessage))
})