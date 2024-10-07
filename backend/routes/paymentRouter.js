const express = require('express')
const {
  getPayments,
  getPayment,
  createPayment,
} = require('../controllers/paymentController')
const ExpressBrute = require('express-brute')

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
router.post('/createPayment', bruteForce.prevent, createPayment)

module.exports = router
