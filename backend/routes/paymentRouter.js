const express = require('express')
const {
  getPayments,
  getPayment,
  createPayment,
} = require('../controllers/paymentController')

//create instance of router
const router = express.Router()

//get all payments
router.get('/getPayments', getPayments)

//get one payment
router.get('/:id', getPayment)

//create new payment
router.post('/createPayment', createPayment)

module.exports = router
