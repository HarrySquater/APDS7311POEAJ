require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const userRoutes = require('./routes/userRouter')
const fs = require('fs')
const path = require('path')
const paymentRoutes = require('./routes/paymentRouter')
const helmet = require('helmet')

const app = express()

//using helmet
app.use(helmet())
app.use(express.json())

//use user and payment routes
app.use('/api/users', userRoutes)
app.use('/api/payments', paymentRoutes)

//creating HTTPS server
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

//connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests on the HTTPS server
    sslServer.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
