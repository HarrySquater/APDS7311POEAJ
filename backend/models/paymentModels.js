const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//creating the schema
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

  const salt = await bcrypt.genSalt(10)
  const hashSA = await bcrypt.hash(swiftAccount, salt)
  const hashSC = await bcrypt.hash(swiftCode, salt)
  const payment = await this.create({
    paymentAmount,
    currencyType,
    bankProvider,
    swiftAccount: hashSA,
    swiftCode: hashSC,
  })
  return payment
}

//create the model "payment"
module.exports = mongoose.model('Payment', paymentSchema)
