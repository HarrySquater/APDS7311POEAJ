const express = require('express')
const {
  getPayments,
  getPayment,
  createPayment,
  verifyPayment,
} = require('../controllers/paymentController')
const ExpressBrute = require('express-brute')
const authenticate = require('../utils/authenticate')

//create instance of router
const router = express.Router()

const store = new ExpressBrute.MemoryStore()
const bruteForce = new ExpressBrute(store, {
  freeRetries: 3,
  minWait: 1000 * 60 * 10, //10 min wait time after login attempts
  maxWait: 1000 * 60 * 20, //20 min max wait time
  lifetime: 1000 * 60 * 20, //20 min lifetime
})

//get all payments
router.get('/getPayments', getPayments)

//get one payment
router.get('/:id', getPayment)

//create new payment
router.post('/createPayment', authenticate, bruteForce.prevent, createPayment)

//verify payment
router.patch('/verifyPayment', bruteForce.prevent, verifyPayment)

module.exports = router
