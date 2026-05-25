require('dotenv').config()
const mongoose = require('mongoose')

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected:', process.env.MONGO_URI)
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

const disconnect = async () => {
  await mongoose.disconnect()
  console.log('🔌 MongoDB disconnected')
}

module.exports = { connect, disconnect }