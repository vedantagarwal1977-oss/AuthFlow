// controllers/authController.js: the logic behind each auth endpoint.
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { httpError } = require('../middleware/errorHandler')

// Creates a signed token that stores the user's id and expires in 7 days
const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

// Only send safe fields back to the browser (never the password)
const publicUser = (u) => ({ id: u._id, fullName: u.fullName, username: u.username, email: u.email })

// POST /api/auth/signup
exports.signup = async (req, res) => {
  const { fullName, username, email, password } = req.body

  // 1. Validate (never trust the frontend; anyone can call the API directly)
  if (!fullName?.trim() || !username?.trim() || !email?.trim() || !password)
    throw httpError(400, 'All fields are required.')
  if (!/^\S+@\S+\.\S+$/.test(email)) throw httpError(400, 'Enter a valid email.')
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim()))
    throw httpError(400, 'Username must be 3-20 letters, numbers or underscores.')
  if (password.length < 6) throw httpError(400, 'Password must be at least 6 characters.')

  // 2. Check duplicates
  if (await User.findOne({ email: email.toLowerCase().trim() }))
    throw httpError(409, 'That email is already registered.')
  if (await User.findOne({ username: username.toLowerCase().trim() }))
    throw httpError(409, 'That username is already taken.')

  // 3. Hash the password (10 = salt rounds; higher is slower and safer)
  const hashed = await bcrypt.hash(password, 10)

  // 4. Save, then log the user in right away by returning a token
  const user = await User.create({ fullName, username, email, password: hashed })
  res.status(201).json({ token: createToken(user._id), user: publicUser(user) })
}

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) throw httpError(400, 'Email and password are required.')

  // .select('+password') asks Mongoose to include the hidden hash for this query
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

  // Same message for "no such user" and "wrong password" so attackers can't tell which emails exist
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw httpError(401, 'Invalid email or password.')

  res.json({ token: createToken(user._id), user: publicUser(user) })
}

// GET /api/auth/me (protected: req.user is set by the auth middleware)
exports.getMe = async (req, res) => {
  res.json({ user: publicUser(req.user) })
}