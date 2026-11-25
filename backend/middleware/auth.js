// middleware/auth.js: runs BEFORE protected controllers. Verifies the JWT.
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { httpError } = require('./errorHandler')

module.exports = async (req, res, next) => {
  try {
    // The client sends:  Authorization: Bearer <token>
    const header = req.headers.authorization || ''
    if (!header.startsWith('Bearer ')) throw httpError(401, 'Not logged in.')

    // verify() throws if the token is fake, tampered with, or expired
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) throw httpError(401, 'User no longer exists.')

    req.user = user // make the user available to the next handler
    next()          // continue to the controller
  } catch (err) {
    next(err.status ? err : httpError(401, 'Session expired. Please log in again.'))
  }
}