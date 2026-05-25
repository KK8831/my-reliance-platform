const mongoose = require('mongoose')

const vipLevelSchema = new mongoose.Schema({
  level:          { type: Number, required: true, unique: true },
  label:          { type: String },
  min_investment: { type: Number, required: true },
  badge_url:      { type: String, default: '' },
  description:    { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('VipLevel', vipLevelSchema)