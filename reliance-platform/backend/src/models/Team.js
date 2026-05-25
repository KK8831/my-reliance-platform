const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  user_id:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referrer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level:       { type: Number, enum: [1, 2, 3], required: true },
  commission_rate: { type: Number, required: true },
  is_valid:    { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Team', teamSchema)