const User     = require('../models/User')
const VipLevel = require('../models/VipLevel')

module.exports = {
  checkAndUpgrade: async (userId) => {
    const user   = await User.findById(userId)
    const levels = await VipLevel.find().sort({ level: 1 })

    let newLevel = 0
    for (const lvl of levels) {
      if (user.total_invested >= lvl.min_investment) newLevel = lvl.level
      else break
    }

    if (newLevel > user.vip_level) {
      user.vip_level = newLevel
      await user.save()
    }
    return user.vip_level
  },
}