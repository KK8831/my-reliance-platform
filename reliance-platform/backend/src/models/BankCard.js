const mongoose = require('mongoose')

const bankCardSchema = new mongoose.Schema({
  user_id:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bank_name:     { type: String, required: true },
  account_name:  { type: String, required: true },
  account_number:{ type: String, required: true },
  ifsc_code:     { type: String, default: '' },
  upi_id:        { type: String, default: '' },
  last4:         { type: String },
  is_default:    { type: Boolean, default: false },
  is_active:     { type: Boolean, default: true },
}, { timestamps: true })

bankCardSchema.pre('save', function(next) {
  if (this.account_number) this.last4 = this.account_number.slice(-4)
  next()
})

module.exports = mongoose.model('BankCard', bankCardSchema)