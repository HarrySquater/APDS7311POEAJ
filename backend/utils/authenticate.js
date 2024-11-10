const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authenticate = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(decoded.id) // Populate req.user with user data
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = authenticate
