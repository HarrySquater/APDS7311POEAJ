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

//create the model "payment"
module.exports = mongoose.model('Payment', paymentSchema)
