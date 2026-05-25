const { withdrawalFeeRate } = require('../config/env')

module.exports = (amount) => {
  const fee = parseFloat((amount * withdrawalFeeRate).toFixed(2))
  const net = parseFloat((amount - fee).toFixed(2))
  return { fee, net }
}