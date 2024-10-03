const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

//login user
const loginUser = async (req, res) => {
  const { fullName, accountNumber, password } = req.body
  try {
    const user = await User.login(fullName, accountNumber, password)
    //storing token in cookie
    const token = createToken(user.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      //stores cookie for an hour
      maxAge: 60 * 60 * 1000,
      sameSite: 'Lax',
    })

    res.status(200).json({ fullName })
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

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
}
