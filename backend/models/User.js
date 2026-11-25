// models/User.js: the shape of a user document stored in MongoDB.
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    // unique: true makes MongoDB reject duplicates; lowercase keeps "Sam" and "sam" the same
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select: false = the hash is NOT returned by queries unless we ask for it
    password: { type: String, required: true, select: false },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
)

module.exports = mongoose.model('User', userSchema)