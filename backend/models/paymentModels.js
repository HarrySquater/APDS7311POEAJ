const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')
const { encrypt } = require('../utils/encryptionUtils')

const Schema = mongoose.Schema
const paymentSchema = new Schema(
  {
    paymentAmount: {
      type: Number,
      required: true,
    },
    currencyType: {
      type: String,
      required: true,
    },
    bankProvider: {
      type: String,
      required: true,
    },
    swiftAccount: {
      type: String,
      required: true,
    },
    swiftCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

paymentSchema.statics.createPayment = async function (
  paymentAmount,
  currencyType,
  bankProvider,
  swiftAccount,
  swiftCode
) {
  if (
    !paymentAmount ||
    !currencyType ||
    !bankProvider ||
    !swiftAccount ||
    !swiftCode
  ) {
    throw Error('All fields must be filled')
  }

  //validate paymentAmount is numeric
  if (!validator.isNumeric(paymentAmount.toString())) {
    throw Error('Payment amount must be a number')
  }

  //validate paymentAmount is in a currency format
  if (!validator.isCurrency(paymentAmount.toString())) {
    throw Error('Invalid payment amount format')
  }

  //validate currencyType with regex
  const currencyTypeRegex = /^[A-Z]{3}$/
  if (!currencyTypeRegex.test(currencyType)) {
    throw Error('Currency type must be a valid 3-letter code (e.g., ZAR, EUR)')
  }

  //validate swiftAccount (8 to 12 alphanumeric characters)
  if (!validator.isAlphanumeric(swiftAccount)) {
    throw Error('Swift account must be alphanumeric')
  }

  if (!validator.isLength(swiftAccount, { min: 8, max: 12 })) {
    throw Error('Swift account must be between 8 and 12 characters')
  }

  //validate swiftCode with regex
  const swiftCodeRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/
  if (!swiftCodeRegex.test(swiftCode)) {
    throw Error('Invalid SWIFT code format')
  }

  //validate bank provider: only letters and spaces, and a length between 2 and 50
  if (!/^[a-zA-Z\s]{2,50}$/.test(bankProvider)) {
    throw Error(
      'Bank Provider must contain only letters and spaces, and be between 2 and 50 characters long'
    )
  }

  //encrypt sensitive fields (swiftAccount and swiftCode)
  const encryptedSwiftAccount = encrypt(swiftAccount)
  const encryptedSwiftCode = encrypt(swiftCode)

  const payment = await this.create({
    paymentAmount,
    currencyType,
    bankProvider,
    swiftAccount: encryptedSwiftAccount,
    swiftCode: encryptedSwiftCode,
  })

  return payment
}

module.exports = mongoose.model('Payment', paymentSchema)
