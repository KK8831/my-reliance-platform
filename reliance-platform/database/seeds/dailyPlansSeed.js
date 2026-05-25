const { connect, disconnect } = require('../connection')
const mongoose = require('mongoose')

const DAILY_PLANS_DATA = [
  {
    name:               'Refinery Project',
    type:               'daily',
    price:              1466,
    daily_earnings:     134383.33,
    hourly_earnings:    0,
    revenue_days:       1,
    total_income:       134168.32,
    required_vip_level: 1,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
  {
    name:               'VIP1 Benefits',
    type:               'daily',
    price:              200,
    daily_earnings:     340,
    hourly_earnings:    0,
    revenue_days:       1,
    total_income:       340,
    required_vip_level: 1,
    image_url:          '/assets/images/oil-rig-1.jpg',
    badge:              'VIP.1',
    is_active:          true,
  },
  {
    name:               'VIP2 Benefits',
    type:               'daily',
    price:              500,
    daily_earnings:     1100,
    hourly_earnings:    0,
    revenue_days:       1,
    total_income:       1100,
    required_vip_level: 2,
    image_url:          '/assets/images/refinery-1.jpg',
    badge:              'VIP.2',
    is_active:          true,
  },
  {
    name:               'VIP3 Benefits',
    type:               'daily',
    price:              1000,
    daily_earnings:     3200,
    hourly_earnings:    0,
    revenue_days:       1,
    total_income:       3200,
    required_vip_level: 3,
    image_url:          '/assets/images/refinery-2.jpg',
    badge:              'VIP.3',
    is_active:          true,
  },
  {
    name:               'VIP4 Benefits',
    type:               'daily',
    price:              2000,
    daily_earnings:     7200,
    hourly_earnings:    0,
    revenue_days:       1,
    total_income:       7200,
    required_vip_level: 4,
    image_url:          '/assets/images/saree-vip4.jpg',
    badge:              'VIP.4',
    is_active:          true,
  },
]

const seed = async () => {
  const db  = mongoose.connection.db
  const col = db.collection('products')

  console.log('🌱 Seeding daily plans...')
  await col.deleteMany({ type: 'daily' })

  const result = await col.insertMany(DAILY_PLANS_DATA)
  console.log(`  ✅ Inserted ${result.insertedCount} daily plans`)
}

if (require.main === module) {
  connect().then(seed).then(disconnect)
} else {
  module.exports = seed
}