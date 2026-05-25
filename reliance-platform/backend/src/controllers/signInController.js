const User        = require('../models/User')
const DailySignIn = require('../models/DailySignIn')

exports.signIn = async (req, res, next) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const alreadySigned = await DailySignIn.findOne({
      user_id:   req.user._id,
      signed_at: { $gte: today },
    })
    if (alreadySigned) return res.status(400).json({ message: 'Already signed in today' })

    const reward = 0 // Set reward logic here
    await DailySignIn.create({ user_id: req.user._id, reward })
    await User.findByIdAndUpdate(req.user._id, { $inc: { daily_sign_in_count: 1 }, last_sign_in: new Date() })

    res.json({ success: true, message: 'Sign in successful', reward })
  } catch (err) { next(err) }
}

exports.getRecord = async (req, res, next) => {
  try {
    const records = await DailySignIn.find({ user_id: req.user._id }).sort({ signed_at: -1 }).limit(30)
    res.json({ records })
  } catch (err) { next(err) }
}