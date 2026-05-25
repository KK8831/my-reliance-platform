const { connect, disconnect } = require('../connection')
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const seed = async () => {
  const db  = mongoose.connection.db
  const col = db.collection('users')

  console.log('🌱 Seeding admin user...')

  const existing = await col.findOne({ phone: '9999999999' })
  if (existing) {
    console.log('  ℹ️  Admin user already exists, skipping')
    return
  }

  const password_hash = await bcrypt.hash('Admin@123', 12)
  const tx_password_hash = await bcrypt.hash('123456', 12)

  await col.insertOne({
    phone:                     '9999999999',
    nickname:                  'Admin',
    password_hash,
    transaction_password_hash: tx_password_hash,
    invitation_code:           'ADMIN1',
    referred_by_code:          null,
    referred_by_id:            null,
    vip_level:                 7,
    recharge_balance:          1000000,
    withdraw_balance:          1000000,
    product_income:            0,
    total_invested:            1000000,
    is_active:                 true,
    createdAt:                 new Date(),
    updatedAt:                 new Date(),
  })

  console.log('  ✅ Admin user created')
  console.log('  📱 Phone:    9999999999')
  console.log('  🔑 Password: Admin@123')
  console.log('  💳 TX Pass:  123456')
}

if (require.main === module) {
  connect().then(seed).then(disconnect)
} else {
  module.exports = seed
}