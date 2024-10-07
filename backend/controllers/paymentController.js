const Payment = require('../models/paymentModels')
const mongoose = require('mongoose')
const validator = require('validator')

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
  const { paymentAmount, currencyType, bankProvider, swiftAccount, swiftCode } =
    req.body

  if (
    !paymentAmount ||
    !currencyType ||
    !bankProvider ||
    !swiftAccount ||
    !swiftCode
  ) {
    return res.status(400).json({ error: 'All fields must be filled' })
  }

  if (!validator.isNumeric(paymentAmount.toString())) {
    return res.status(400).json({ error: 'Payment amount must be a number' })
  }

  if (!validator.isCurrency(paymentAmount.toString())) {
    return res.status(400).json({ error: 'Invalid payment amount format' })
  }

  if (!validator.isAlphanumeric(currencyType)) {
    return res.status(400).json({ error: 'Currency type must be alphanumeric' })
  }

  if (!validator.isLength(swiftAccount, { min: 8, max: 12 })) {
    return res
      .status(400)
      .json({ error: 'Swift account must be between 8 and 12 characters' })
  }

  if (!validator.isAlphanumeric(swiftCode)) {
    return res.status(400).json({ error: 'Swift code must be alphanumeric' })
  }

  try {
    const payment = await Payment.createPayment(
      paymentAmount,
      currencyType,
      bankProvider,
      swiftAccount,
      swiftCode
    )
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
