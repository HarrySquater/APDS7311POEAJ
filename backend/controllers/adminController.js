const AdminUser = require('../models/adminModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

//login admin
const loginAdmin = async (req, res) => {
  const { idNumber, password, recaptchaToken } = req.body

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`

  try {
    const captchaResponse = await fetch(verificationURL, { method: 'POST' })
    const captchaData = await captchaResponse.json()

    if (!captchaData.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' })
    }

    const admin = await AdminUser.login(idNumber, password)
    //storing token in cookie
    const token = createToken(admin.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      //stores cookie for an hour
      maxAge: 60 * 60 * 1000,
      sameSite: 'Lax',
    })

    res.status(200).json({ idNumber })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const logoutAdmin = async (req, res) => {
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

//sign up admin
const signupAdmin = async (req, res) => {
  const { idNumber, password } = req.body
  try {
    const admin = await AdminUser.signup(idNumber, password)

    //add token to track session
    const token = createToken(admin.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, //1 hour
    })
    res.status(200).json({ idNumber })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  loginAdmin,
  signupAdmin,
  logoutAdmin,
}
