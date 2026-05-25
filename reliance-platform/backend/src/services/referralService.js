const User       = require('../models/User')
const Team       = require('../models/Team')
const Transaction= require('../models/Transaction')

const COMMISSION_RATES = [
  { level: 1, rate: 0.35 },
  { level: 2, rate: 0.09 },
  { level: 3, rate: 0.01 },
]

module.exports = {
  buildTeam: async (newUser) => {
    if (!newUser.referred_by_id) return

    let currentReferrerId = newUser.referred_by_id
    for (const { level, rate } of COMMISSION_RATES) {
      if (!currentReferrerId) break
      const referrer = await User.findById(currentReferrerId)
      if (!referrer) break

      await Team.create({
        user_id:         newUser._id,
        referrer_id:     referrer._id,
        level,
        commission_rate: rate,
        is_valid:        false,
      })

      currentReferrerId = referrer.referred_by_id
    }
  },

  activateAndPay: async (newUser) => {
    const teamEntries = await Team.find({ user_id: newUser._id }).populate('referrer_id')
    for (const entry of teamEntries) {
      if (entry.is_valid) continue
      entry.is_valid = true
      await entry.save()

      if (entry.level === 1) {
        const bonus = 50
        await User.findByIdAndUpdate(entry.referrer_id._id, { $inc: { withdraw_balance: bonus } })
        await Transaction.create({
          user_id:    entry.referrer_id._id,
          type:       'referral_bonus',
          amount:     bonus,
          fee_amount: 0,
          net_amount: bonus,
          status:     'success',
          note:       `Referral bonus for inviting user ${newUser.nickname}`,
        })
      }
    }
  },
}