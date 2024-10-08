require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const userRoutes = require('./routes/userRouter')
const paymentRoutes = require('./routes/paymentRouter')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

const app = express()

//middleware
app.use(helmet())
app.use(express.json())
app.use(cookieParser())

//cSRF protection
const csrfProtection = csrf({ cookie: true })
app.use(csrfProtection)

//routing to send CSRF token
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

//CSFR protection on routes
app.use('/api/users', csrfProtection, userRoutes)
app.use('/api/payments', csrfProtection, paymentRoutes)

//create HTTPS server
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

//connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    sslServer.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
