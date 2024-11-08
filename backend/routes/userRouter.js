const express = require('express')
const {
  loginUser,
  signupUser,
  logoutUser,
} = require('../controllers/userController')
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
router.post('/login', bruteForce.prevent, loginUser)

//sign up
router.post('/signup', bruteForce.prevent, signupUser)

//log out
router.post('/logout', logoutUser)

module.exports = router
