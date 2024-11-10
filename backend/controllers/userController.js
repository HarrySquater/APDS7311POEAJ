const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { decrypt } = require('../utils/encryptionUtils')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

//login user
const loginUser = async (req, res) => {
  const { fullName, accountNumber, password } = req.body
  try {
    const user = await User.login(fullName, accountNumber, password)
    const token = createToken(user.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
      sameSite: 'Lax',
    })

    res.status(200).json({ fullName: user.fullName, id: user.id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch {
    res.status(400).json({ error: error.message })
  }
}

//sign up user
const signupUser = async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body
  try {
    const user = await User.signup(fullName, idNumber, accountNumber, password)

    //add token to track session
    const token = createToken(user.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, //1 hour
    })
    res.status(200).json({ fullName })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//get user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Decrypt the account number
    const decryptedAccountNumber = decrypt(user.accountNumber)

    // Send user details with decrypted account number
    res
      .status(200)
      .json({ name: user.fullName, accountNumber: decryptedAccountNumber })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user details' })
  }
}

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  getUserById,
}
