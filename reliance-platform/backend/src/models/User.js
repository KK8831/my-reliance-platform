const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema({
  phone:                    { type: String, required: true, unique: true },
  nickname:                 { type: String, required: true },
  password_hash:            { type: String, required: true },
  transaction_password_hash:{ type: String, default: null },
  invitation_code:          { type: String, unique: true },
  referred_by_code:         { type: String, default: null },
  referred_by_id:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  vip_level:                { type: Number, default: 0, min: 0, max: 7 },
  recharge_balance:         { type: Number, default: 0 },
  withdraw_balance:         { type: Number, default: 0 },
  product_income:           { type: Number, default: 0 },
  total_invested:           { type: Number, default: 0 },
  daily_sign_in_count:      { type: Number, default: 0 },
  last_sign_in:             { type: Date, default: null },
  is_active:                { type: Boolean, default: true },
}, { timestamps: true })

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password_hash)
}

userSchema.methods.compareTxPassword = function(password) {
  return bcrypt.compare(password, this.transaction_password_hash)
}

userSchema.statics.hashPassword = async (password) => {
  return bcrypt.hash(password, 12)
}

module.exports = mongoose.model('User', userSchema)