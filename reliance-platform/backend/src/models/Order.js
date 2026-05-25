const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user_id:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_id:        { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  amount_paid:       { type: Number, required: true },
  daily_earnings:    { type: Number, default: 0 },
  hourly_earnings:   { type: Number, default: 0 },
  total_earned:      { type: Number, default: 0 },
  earnings_count:    { type: Number, default: 0 },
  max_earnings_count:{ type: Number, default: 1 },
  start_date:        { type: Date, default: Date.now },
  end_date:          { type: Date },
  last_credited:     { type: Date, default: null },
  type:              { type: String, enum: ['stable', 'daily', 'activity'] },
  status:            { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)