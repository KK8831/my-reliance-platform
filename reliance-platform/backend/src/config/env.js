module.exports = {
  port:               process.env.PORT              || 5000,
  mongoUri:           process.env.MONGO_URI,
  jwtSecret:          process.env.JWT_SECRET,
  jwtExpiresIn:       process.env.JWT_EXPIRES_IN    || '7d',
  withdrawalFeeRate:  parseFloat(process.env.WITHDRAWAL_FEE_RATE) || 0.05,
  maxWithdrawalsPerDay: parseInt(process.env.MAX_WITHDRAWALS_PER_DAY) || 2,
  minWithdrawal:      parseInt(process.env.MIN_WITHDRAWAL) || 106,
  maxWithdrawal:      parseInt(process.env.MAX_WITHDRAWAL) || 1500000,
  minDeposit:         parseInt(process.env.MIN_DEPOSIT)    || 100,
  maxDeposit:         parseInt(process.env.MAX_DEPOSIT)    || 100000,
}