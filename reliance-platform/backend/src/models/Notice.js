const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, default: '' },
  icon_url: { type: String, default: '' },
  type:     { type: String, enum: ['lucky_roulette', 'daily_login', 'referral', 'recharge', 'general'], default: 'general' },
  is_active:{ type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Notice', noticeSchema)