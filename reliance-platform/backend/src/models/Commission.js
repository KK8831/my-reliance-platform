const mongoose = require('mongoose')

const commissionSchema = new mongoose.Schema({
  earner_id:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from_user_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  level:       { type: Number, enum: [1, 2, 3] },
  rate:        { type: Number },
  base_amount: { type: Number },
  commission_amount: { type: Number },
  status:      { type: String, enum: ['pending', 'paid'], default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('Commission', commissionSchema)