const Order       = require('../models/Order')
const User        = require('../models/User')
const Transaction = require('../models/Transaction')

module.exports = {
  creditDaily: async () => {
    const orders = await Order.find({ status: 'active', type: { $in: ['stable', 'daily'] } })
    for (const order of orders) {
      if (order.earnings_count >= order.max_earnings_count) {
        order.status = 'completed'
        await order.save()
        continue
      }
      const earnings = order.daily_earnings
      order.total_earned    += earnings
      order.earnings_count  += 1
      order.last_credited    = new Date()
      if (order.earnings_count >= order.max_earnings_count) order.status = 'completed'
      await order.save()

      await User.findByIdAndUpdate(order.user_id, { $inc: { product_income: earnings, withdraw_balance: earnings } })
      await Transaction.create({
        user_id:    order.user_id,
        type:       'earning',
        amount:     earnings,
        fee_amount: 0,
        net_amount: earnings,
        status:     'success',
        note:       `Daily earning from order ${order._id}`,
      })
    }
  },

  creditHourly: async () => {
    const orders = await Order.find({ status: 'active', type: 'activity' })
    for (const order of orders) {
      if (order.earnings_count >= order.max_earnings_count) {
        order.status = 'completed'
        await order.save()
        continue
      }
      const earnings = order.hourly_earnings
      order.total_earned   += earnings
      order.earnings_count += 1
      order.last_credited   = new Date()
      if (order.earnings_count >= order.max_earnings_count) order.status = 'completed'
      await order.save()

      await User.findByIdAndUpdate(order.user_id, { $inc: { product_income: earnings, withdraw_balance: earnings } })
      await Transaction.create({
        user_id:    order.user_id,
        type:       'earning',
        amount:     earnings,
        fee_amount: 0,
        net_amount: earnings,
        status:     'success',
        note:       `Hourly earning from order ${order._id}`,
      })
    }
  },
}