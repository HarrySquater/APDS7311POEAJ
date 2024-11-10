require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const userRoutes = require('./routes/userRouter')
const paymentRoutes = require('./routes/paymentRouter')
const adminRoutes = require('./routes/adminRouter')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

const app = express()

//middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'img-src': ["'self'", 'https:', 'data:'],
        'script-src': ["'self'", "'unsafe-inline'", 'https:'],
        'connect-src': ["'self'", 'https:'],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    crossOriginEmbedderPolicy: true,
    crossOriginResourcePolicy: { policy: 'same-origin' },
    dnsPrefetchControl: { allow: false }, //disable DNS prefetch
    expectCt: { maxAge: 86400, enforce: true }, //header to prevent man in the middle
    frameguard: { action: 'deny' }, //disallow iframes to prevent clickjacking
    hidePoweredBy: true, //avoid revealing server details
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, //enforce HTTPS
    ieNoOpen: true, //prevent opening of unstrusted html
    noSniff: true, //prevent MIME sniffing
    originAgentCluster: true,
    permittedCrossDomainPolicies: { permittedPolicies: 'none' }, //block plug ins
    xssFilter: true, //xss protection header
  })
)
app.use(express.json())
app.use(cookieParser())

//cSRF protection
const csrfProtection = csrf({
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' },
})
app.use(csrfProtection)

//routing to send CSRF token
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

//CSFR protection on routes
app.use('/api/users', csrfProtection, userRoutes)
app.use('/api/payments', csrfProtection, paymentRoutes)
app.use('/api/admin', csrfProtection, adminRoutes)

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
