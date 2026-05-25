const Team    = require('../models/Team')
const User    = require('../models/User')
const Commission = require('../models/Commission')

exports.getTeam = async (req, res, next) => {
  try {
    const user      = req.user
    const teamCount = await Team.countDocuments({ referrer_id: user._id, level: 1 })
    const commissions = await Commission.find({ earner_id: user._id })
    const totalReferralAmount = commissions.reduce((sum, c) => sum + c.commission_amount, 0)

    res.json({
      team: {
        size:            teamCount,
        referralAmount:  totalReferralAmount,
        inviteLink:      `${process.env.FRONTEND_URL}/?invitation_code=${user.invitation_code}`,
        levels: [
          { level: 1, rate: '35%' },
          { level: 2, rate: '9%'  },
          { level: 3, rate: '1%'  },
        ],
      },
    })
  } catch (err) { next(err) }
}

exports.getTeamDetails = async (req, res, next) => {
  try {
    const levels = [1, 2, 3]
    const details = await Promise.all(levels.map(async (level) => {
      const entries     = await Team.find({ referrer_id: req.user._id, level }).populate('user_id')
      const registered  = entries.length
      const valid       = entries.filter(e => e.is_valid).length
      const commissions = await Commission.find({ earner_id: req.user._id, level })
      const revenue     = commissions.reduce((s, c) => s + c.commission_amount, 0)
      return { level, registered, valid, total_revenue: revenue }
    }))
    res.json({ details })
  } catch (err) { next(err) }
}

exports.getCommissions = async (req, res, next) => {
  try {
    const commissions = await Commission.find({ earner_id: req.user._id })
      .populate('from_user_id', 'nickname phone')
      .sort({ createdAt: -1 })
    res.json({ commissions })
  } catch (err) { next(err) }
}