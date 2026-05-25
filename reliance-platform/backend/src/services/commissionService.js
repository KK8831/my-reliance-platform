const User       = require('../models/User')
const Team       = require('../models/Team')
const Commission = require('../models/Commission')
const Transaction= require('../models/Transaction')

module.exports = {
  distribute: async (buyerUser, order, amount) => {
    const teamEntries = await Team.find({ user_id: buyerUser._id, is_valid: true })

    for (const entry of teamEntries) {
      const commissionAmount = parseFloat((amount * entry.commission_rate).toFixed(2))

      const commission = await Commission.create({
        earner_id:         entry.referrer_id,
        from_user_id:      buyerUser._id,
        order_id:          order._id,
        level:             entry.level,
        rate:              entry.commission_rate,
        base_amount:       amount,
        commission_amount: commissionAmount,
        status:            'paid',
      })

      await User.findByIdAndUpdate(entry.referrer_id, { $inc: { withdraw_balance: commissionAmount } })
      await Transaction.create({
        user_id:    entry.referrer_id,
        type:       'commission',
        amount:     commissionAmount,
        fee_amount: 0,
        net_amount: commissionAmount,
        status:     'success',
        note:       `Level ${entry.level} commission from order ${order._id}`,
      })
    }
  },
}