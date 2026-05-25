const mongoose = require('mongoose')

const dailySignInSchema = new mongoose.Schema({
  user_id:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reward:    { type: Number, default: 0 },
  signed_at: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model('DailySignIn', dailySignInSchema)