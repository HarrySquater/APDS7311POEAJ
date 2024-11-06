const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

//creating the schema
const adminSchema = new Schema(
  {
    idNumber: {
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
adminSchema.statics.signup = async function (idNumber, password) {
  //validate fields are entered
  if (!password || !idNumber) {
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

  //validate ID number
  if (!/^\d{13}$/.test(idNumber)) {
    throw Error('ID Number must be 13 digits')
  }

  //check for existing users with the same ID number or account number
  const existingAdmins = await this.find({
    $or: [{ idNumber: { $exists: true } }],
  })

  //using bcrypt.compare to check for duplicates
  for (const user of existingAdmins) {
    const isIdNumberMatch = await bcrypt.compare(idNumber, user.idNumber)
    //if user is already registered
    if (isIdNumberMatch) {
      throw Error('User already exists')
    }
  }

  //salting the password, ID number
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const hashedIDNumber = await bcrypt.hash(idNumber, salt)

  const adminUser = await this.create({
    password: hashedPassword,
    idNumber: hashedIDNumber,
  })

  return adminUser
}

//adding our own login function
adminSchema.statics.login = async function (idNumber, password) {
  if (idNumber || !password) {
    throw new Error('Please provide all fields')
  }

  //see if user exists
  const user = await this.findOne({ idNumber })
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw new Error('Invalid credentials')
  }

  return user
}

//create the model "user"
module.exports = mongoose.model('AdminUser', adminSchema)
