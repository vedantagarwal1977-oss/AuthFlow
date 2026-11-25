// server.js: the entry point. Creates the Express app, adds middleware,
// mounts routes, then connects to MongoDB and starts listening.
require('dotenv').config({ path: './backend/.env' })// loads values from .env into process.env (must run first)
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL })) // only your React app may call this API
app.use(express.json())                           // parses JSON request bodies into req.body

app.use('/api/auth', authRoutes) // every route in authRoutes now starts with /api/auth

// These two MUST come last: unknown URLs -> 404, any thrown error -> JSON response
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })