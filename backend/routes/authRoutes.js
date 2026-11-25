// routes/authRoutes.js: maps URLs to controller functions.
const express = require('express')
const { signup, login, getMe } = require('../controllers/authController')
const protect = require('../middleware/auth')
const { asyncHandler } = require('../middleware/errorHandler')

const router = express.Router()

router.post('/signup', asyncHandler(signup))
router.post('/login', asyncHandler(login))
router.get('/me', protect, asyncHandler(getMe)) // protect runs first, then getMe

module.exports = router