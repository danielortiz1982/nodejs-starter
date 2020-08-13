const mongoose = require('mongoose')

const database  = 'nodejs-starter'
const appPort   = 27017
//const dbConnection = `mongodb://127.0.0.1:${appPort}/${database}`
const dbConnection = `mongodb://bv:br@nd!ngV3rt!c@l$@ds147592.mlab.com:47592/bv-nodejs-starter`

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// sample db configs 
// user - bv
// password - br@nd!ngV3rt!c@l$
// connection shring
// mongodb://<dbuser>:<dbpassword>@ds147592.mlab.com:47592/bv-nodejs-starter