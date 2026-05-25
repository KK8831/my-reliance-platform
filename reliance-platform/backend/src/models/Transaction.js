const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  user_id:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:            { type: String, enum: ['recharge', 'withdraw', 'commission', 'earning', 'referral_bonus'], required: true },
  amount:          { type: Number, required: true },
  fee_amount:      { type: Number, default: 0 },
  net_amount:      { type: Number, required: true },
  payment_channel: { type: String, default: null },
  status:          { type: String, enum: ['pending', 'success', 'failed', 'rejected'], default: 'pending' },
  bank_card_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'BankCard', default: null },
  reference_id:    { type: String, default: null },
  note:            { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)