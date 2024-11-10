const Payment = require('../models/paymentModels')
const mongoose = require('mongoose')
const { decrypt } = require('../utils/encryptionUtils')

//get all payments
const getPayments = async (req, res) => {
  const payments = await Payment.find({}).sort({ createdAt: -1 })

  // Decrypt swiftAccount and swiftCode for each payment
  const decryptedPayments = payments.map((payment) => ({
    ...payment.toObject(),
    swiftAccount: decrypt(payment.swiftAccount),
    swiftCode: decrypt(payment.swiftCode),
  }))

  res.status(200).json(decryptedPayments)
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

  // Decrypt swiftAccount and swiftCode
  const decryptedPayment = {
    ...payment.toObject(),
    swiftAccount: decrypt(payment.swiftAccount),
    swiftCode: decrypt(payment.swiftCode),
  }

  res.status(200).json(decryptedPayment)
}

//create a new payment
const createPayment = async (req, res) => {
  const { paymentAmount, currencyType, bankProvider, swiftAccount, swiftCode } =
    req.body
  const userId = req.user.id

  try {
    const payment = await Payment.createPayment(
      paymentAmount,
      currencyType,
      bankProvider,
      swiftAccount,
      swiftCode,
      userId // Pass userId to the createPayment static method
    )
    res.status(200).json(payment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const verifyPayment = async (req, res) => {
  const { id, swiftAccount, swiftCode } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const payment = await Payment.findById(id)

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found!' })
    }

    //decrypt to compare
    const decryptedSwiftAccount = decrypt(payment.swiftAccount)
    const decryptedSwiftCode = decrypt(payment.swiftCode)

    //verify details
    if (
      decryptedSwiftAccount !== swiftAccount ||
      decryptedSwiftCode !== swiftCode
    ) {
      return res
        .status(400)
        .json({ error: 'Swift account or code does not match' })
    }

    //mark as true
    payment.verified = true
    await payment.save()

    res.status(200).json(payment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  verifyPayment,
}
