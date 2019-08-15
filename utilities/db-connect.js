const mongoose = require('mongoose')

const database  = 'nodejs-starter'
const appPort   = 27017
const dbConnection = `mongodb://127.0.0.1:${appPort}/${database}`

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

