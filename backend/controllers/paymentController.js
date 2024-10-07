const Payment = require('../models/paymentModels')
const mongoose = require('mongoose')

//get all payments
const getPayments = async (req, res) => {
  const payments = await Payment.find({}).sort({ createdAt: -1 })
  res.status(200).json(payments)
}

//get one payment
const getPayment = async (req, res) => {
  //calling the id of the specific payment
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const payment = await Payment.findById(id)

  //if payment is not found with the ID, gives error
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found!' })
  }

  //if found it returns the payment
  res.status(200).json({ payment })
}

//create new payment
const createPayment = async (req, res) => {
  //request body
  const { paymentAmount, currencyType, bankProvider, swiftAccount, swiftCode } =
    req.body
  //add document to the database
  try {
    const payment = await Payment.create({
      paymentAmount,
      currencyType,
      bankProvider,
      swiftAccount,
      swiftCode,
    })
    res.status(200).json(payment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getPayments,
  getPayment,
  createPayment,
}
