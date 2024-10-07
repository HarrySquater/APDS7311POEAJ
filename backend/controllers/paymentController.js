const Payment = require('../models/paymentModels')
const mongoose = require('mongoose')

//get all payments
const getPayments = async (req, res) => {
  const payments = await Payment.find({}).sort({ createdAt: -1 })
  res.status(200).json(payments)
}

//get a single payment by ID
const getPayment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const payment = await Payment.findById(id)

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found!' })
  }

  res.status(200).json({ payment })
}

//create a new payment
const createPayment = async (req, res) => {
  const { paymentAmount, currencyType, bankProvider, swiftAccount, swiftCode } =
    req.body

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
