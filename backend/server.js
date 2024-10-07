require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const userRoutes = require('./routes/userRouter')
const fs = require('fs')
const { error } = require('console')
const path = require('path')
const paymentRoutes = require('./routes/paymentRouter')

const app = express()
app.use(express.json())

// Use user routes
app.use('/api/users', userRoutes)
app.use('/api/payments', paymentRoutes)

//creating https server
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

//connecting to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listenf or request on HTTPS server
    sslServer.listen(process.env.PORT, () => {
      console.log('Server is running on port 3000')
    })
  })
  .catch((error) => {
    console.log(error)
  })
