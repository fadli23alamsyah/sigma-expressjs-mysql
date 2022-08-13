const express = require('express')
const dotenv = require('dotenv')

const sigmaRoute = require('./src/routes/sigmaRoute')

const app = express()

// config env
dotenv.config({path: './.env'})

// Endpoint
app.use('/api/sigma', sigmaRoute)

// run server
app.listen(process.env.PORT, ()=> {
    console.log(`Server running with port ${process.env.PORT}`)
})