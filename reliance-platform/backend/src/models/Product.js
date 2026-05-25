const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  type:             { type: String, enum: ['stable', 'daily', 'activity'], required: true },
  price:            { type: Number, required: true },
  daily_earnings:   { type: Number, default: 0 },
  hourly_earnings:  { type: Number, default: 0 },
  revenue_days:     { type: Number, default: 1 },
  total_income:     { type: Number, default: 0 },
  required_vip_level: { type: Number, default: 0 },
  image_url:        { type: String, default: '' },
  badge:            { type: String, default: 'VIP.0' },
  is_active:        { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)