const { connect, disconnect } = require('../connection')
const mongoose = require('mongoose')

const ACTIVITY_PLANS_DATA = [
  {
    name:               'Refinery Project',
    type:               'activity',
    price:              266,
    daily_earnings:     0,
    hourly_earnings:    26537.5,
    revenue_days:       1,
    total_income:       26399.04,
    required_vip_level: 1,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
  {
    name:               'Refinery Project',
    type:               'activity',
    price:              966,
    daily_earnings:     0,
    hourly_earnings:    86537.5,
    revenue_days:       1,
    total_income:       86399.04,
    required_vip_level: 1,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
  {
    name:               'Refinery Project',
    type:               'activity',
    price:              2266,
    daily_earnings:     0,
    hourly_earnings:    212437.5,
    revenue_days:       1,
    total_income:       212097.6,
    required_vip_level: 1,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
  {
    name:               'Refinery Project',
    type:               'activity',
    price:              4266,
    daily_earnings:     0,
    hourly_earnings:    417712.5,
    revenue_days:       1,
    total_income:       417044.16,
    required_vip_level: 1,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
  {
    name:               'Refinery Project',
    type:               'activity',
    price:              8866,
    daily_earnings:     0,
    hourly_earnings:    905070.83,
    revenue_days:       1,
    total_income:       903622.72,
    required_vip_level: 1,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
]

const seed = async () => {
  const db  = mongoose.connection.db
  const col = db.collection('products')

  console.log('🌱 Seeding activity plans...')
  await col.deleteMany({ type: 'activity' })

  const result = await col.insertMany(ACTIVITY_PLANS_DATA)
  console.log(`  ✅ Inserted ${result.insertedCount} activity plans`)
}

if (require.main === module) {
  connect().then(seed).then(disconnect)
} else {
  module.exports = seed
}