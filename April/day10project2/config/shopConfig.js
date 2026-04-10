const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("shop db connected")
  } catch (err) {
    console.log("DB connection failed:", err.message)
    process.exit(1)    
  }
}

module.exports = connectDB

