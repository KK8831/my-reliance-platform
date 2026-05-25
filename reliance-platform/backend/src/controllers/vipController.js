const VipLevel = require('../models/VipLevel')

exports.getLevels = async (req, res, next) => {
  try {
    const levels = await VipLevel.find().sort({ level: 1 })
    res.json({
      levels,
      current_level:   req.user.vip_level,
      total_invested:  req.user.total_invested,
    })
  } catch (err) { next(err) }
}