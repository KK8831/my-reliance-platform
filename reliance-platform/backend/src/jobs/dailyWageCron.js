const cron = require('node-cron')
const User = require('../models/User')
const Team = require('../models/Team')
const Transaction = require('../models/Transaction')

// Runs every day at 1 AM
cron.schedule('0 1 * * *', async () => {
  console.log('Running daily wage cron...')
  const users = await User.find({ is_active: true })
  for (const user of users) {
    const teamCount = await Team.countDocuments({ referrer_id: user._id, level: 1, is_valid: true })
    if (teamCount >= 8) {
      const wage = 100
      await User.findByIdAndUpdate(user._id, { $inc: { withdraw_balance: wage } })
      await Transaction.create({
        user_id: user._id, type: 'earning',
        amount: wage, fee_amount: 0, net_amount: wage,
        status: 'success', note: 'Daily wage for 8+ referrals',
      })
    }
  }
  console.log('Daily wage cron complete.')
})