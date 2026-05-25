const rateLimit = require('express-rate-limit')

exports.withdrawLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: parseInt(process.env.MAX_WITHDRAWALS_PER_DAY) || 2,
  message: { message: 'Withdrawal limit reached. Maximum 2 withdrawals per day.' },
  keyGenerator: (req) => req.user?._id?.toString() || req.ip,
})

exports.otpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: { message: 'Please wait before requesting another OTP.' },
})

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Try again later.' },
})