const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

//creating the schema
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

//adding our own signup function. First validate before verfify
userSchema.statics.signup = async function (
  fullName,
  idNumber,
  accountNumber,
  password
) {
  //validate if fields are actually filled
  if (!fullName || !password || !idNumber || !accountNumber) {
    throw Error('All fields must be filled')
  }

  //validate password
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw Error('Password must be stronger')
  }

  //validate account number
  if (!/^\d{7,11}$/.test(accountNumber)) {
    throw Error('Account Number must be between 7 & 11 digits')
  }
  //validate id number
  if (!/^\d{13}$/.test(idNumber)) {
    throw Error('ID Number must be 13 digits')
  }

  //check if ID number is take
  const existingUser = await this.findOne({ idNumber })
  if (existingUser) {
    throw Error('ID Number already taken')
  }

  //salting password, ID number and account number
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const hashedIDNumber = await bcrypt.hash(idNumber, salt)
  const hashedAccountNumber = await bcrypt.hash(accountNumber, salt)
  const user = await this.create({
    fullName,
    password: hashedPassword,
    idNumber: hashedIDNumber,
    accountNumber: hashedAccountNumber,
  })
  return user
}

//adding our own login function
userSchema.statics.login = async function (fullName, accountNumber, password) {
  if (!fullName || !accountNumber || !password) {
    throw new Error('Please provide all fields')
  }

  //see if user exists
  const user = await this.findOne({ fullName })
  if (!user) {
    throw new Error('Invalid full name or account number')
  }

  //comparing against hashed versions
  const isValidAccountNumber = await bcrypt.compare(
    accountNumber,
    user.accountNumber
  )
  if (!isValidAccountNumber) {
    throw new Error('Invalid account number')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw new Error('Invalid password')
  }

  return user
}

//create the model "book"
module.exports = mongoose.model('User', userSchema)
