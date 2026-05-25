const User = require('../models/User')

exports.getProfile = async (req, res, next) => {
  try {
    res.json({
      user: {
        id:              req.user._id,
        phone:           req.user.phone,
        nickname:        req.user.nickname,
        vip_level:       req.user.vip_level,
        invitation_code: req.user.invitation_code,
        recharge_balance:req.user.recharge_balance,
        withdraw_balance:req.user.withdraw_balance,
        product_income:  req.user.product_income,
        total_invested:  req.user.total_invested,
        createdAt:       req.user.createdAt,
      },
    })
  } catch (err) { next(err) }
}

exports.getBalance = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    res.json({
      recharge: user.recharge_balance,
      withdraw: user.withdraw_balance,
      product:  user.product_income,
    })
  } catch (err) { next(err) }
}

exports.updateProfile = async (req, res, next) => {
  try {
    const { nickname } = req.body
    await User.findByIdAndUpdate(req.user._id, { nickname })
    res.json({ success: true, message: 'Profile updated' })
  } catch (err) { next(err) }
}