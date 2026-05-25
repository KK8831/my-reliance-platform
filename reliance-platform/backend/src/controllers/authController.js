const User               = require('../models/User')
const { sign }           = require('../utils/jwtHelper')
const inviteCodeGenerator= require('../utils/inviteCodeGenerator')
const phoneValidator     = require('../utils/phoneValidator')
const otpService         = require('../services/otpService')
const referralService    = require('../services/referralService')

exports.sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body
    if (!phoneValidator(phone)) return res.status(400).json({ message: 'Invalid phone number' })
    await otpService.send(phone)
    res.json({ success: true, message: 'OTP sent successfully' })
  } catch (err) { next(err) }
}

exports.register = async (req, res, next) => {
  try {
    const { phone, nickname, password, invitation_code, otp } = req.body
    if (!phoneValidator(phone)) return res.status(400).json({ message: 'Invalid phone number' })

    const valid = otpService.verify(phone, otp)
    if (!valid) return res.status(400).json({ message: 'Invalid or expired OTP' })

    const exists = await User.findOne({ phone })
    if (exists) return res.status(409).json({ message: 'Phone number already registered' })

    let referredById = null
    if (invitation_code) {
      const referrer = await User.findOne({ invitation_code })
      if (referrer) referredById = referrer._id
    }

    let uniqueCode
    do { uniqueCode = inviteCodeGenerator() } while (await User.findOne({ invitation_code: uniqueCode }))

    const password_hash = await User.hashPassword(password)
    const user = await User.create({
      phone, nickname, password_hash,
      invitation_code: uniqueCode,
      referred_by_code: invitation_code || null,
      referred_by_id:   referredById,
    })

    await referralService.buildTeam(user)

    res.status(201).json({ success: true, message: 'Registration successful. Please login.' })
  } catch (err) { next(err) }
}

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body
    const user = await User.findOne({ phone })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    if (!user.is_active) return res.status(403).json({ message: 'Account is suspended' })

    const token = sign({ id: user._id, phone: user.phone })

    res.json({
      token,
      user: {
        id:              user._id,
        phone:           user.phone,
        nickname:        user.nickname,
        vip_level:       user.vip_level,
        invitation_code: user.invitation_code,
        recharge_balance:user.recharge_balance,
        withdraw_balance:user.withdraw_balance,
        product_income:  user.product_income,
      },
    })
  } catch (err) { next(err) }
}

exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body
    const valid = otpService.verify(phone, otp)
    res.json({ success: valid, message: valid ? 'OTP verified' : 'Invalid OTP' })
  } catch (err) { next(err) }
}