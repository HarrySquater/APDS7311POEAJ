const express = require('express')
const {
  loginAdmin,
  signupAdmin,
  logoutAdmin,
} = require('../controllers/adminController')
const ExpressBrute = require('express-brute')

const router = express.Router()

const store = new ExpressBrute.MemoryStore()
const bruteForce = new ExpressBrute(store, {
  freeRetries: 3,
  minWait: 1000 * 60 * 10, //10 min wait time after login attempts
  maxWait: 1000 * 60 * 20, //20 min max wait time
  lifetime: 1000 * 60 * 20, //20 min lifetime
})

//login
router.post('/loginadmin', bruteForce.prevent, loginAdmin)

//sign up
router.post('/signupadmin', bruteForce.prevent, signupAdmin)

//log out
router.post('/logoutadmin', logoutAdmin)

module.exports = router
