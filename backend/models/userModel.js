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
  //validate fields are entered
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

  //validate ID number
  if (!/^\d{13}$/.test(idNumber)) {
    throw Error('ID Number must be 13 digits')
  }

  //validate full name: only letters and spaces, and a length between 2 and 50
  if (!/^[a-zA-Z\s]{2,50}$/.test(fullName)) {
    throw Error(
      'Full Name must contain only letters and spaces, and be between 2 and 50 characters long'
    )
  }

  //check for existing users with the same ID number or account number
  const existingUsers = await this.find({
    $or: [
      { idNumber: { $exists: true } },
      { accountNumber: { $exists: true } },
    ],
  })

  //using bcrypt.compare to check for duplicates
  for (const user of existingUsers) {
    const isIdNumberMatch = await bcrypt.compare(idNumber, user.idNumber)
    const isAccountNumberMatch = await bcrypt.compare(
      accountNumber,
      user.accountNumber
    )
    //if user is already registered
    if (isIdNumberMatch || isAccountNumberMatch) {
      throw Error('User already exists')
    }
  }

  //salting the password, ID number, and account number
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

//create the model "user"
module.exports = mongoose.model('User', userSchema)
