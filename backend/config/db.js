// config/db.js: connects Mongoose to MongoDB using the URI from .env
const mongoose = require('mongoose')

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')
}

module.exports = connectDB