const { connect, disconnect } = require('../connection')
const mongoose = require('mongoose')

const STABLE_PLANS_DATA = [
  {
    name:               'Purchase upgrade to VIP1',
    type:               'stable',
    price:              290,
    daily_earnings:     240.7,
    hourly_earnings:    0,
    revenue_days:       49,
    total_income:       11794.3,
    required_vip_level: 0,
    image_url:          '/assets/images/oil-rig-1.jpg',
    badge:              'VIP.0',
    is_active:          true,
  },
  {
    name:               'Purchase upgrade to VIP2',
    type:               'stable',
    price:              2770,
    daily_earnings:     2326.8,
    hourly_earnings:    0,
    revenue_days:       49,
    total_income:       114013.2,
    required_vip_level: 0,
    image_url:          '/assets/images/refinery-1.jpg',
    badge:              'VIP.0',
    is_active:          true,
  },
  {
    name:               'Purchase upgrade to VIP3',
    type:               'stable',
    price:              7770,
    daily_earnings:     6604.5,
    hourly_earnings:    0,
    revenue_days:       49,
    total_income:       323620.5,
    required_vip_level: 0,
    image_url:          '/assets/images/refinery-2.jpg',
    badge:              'VIP.0',
    is_active:          true,
  },
  {
    name:               'Purchase upgrade to VIP4',
    type:               'stable',
    price:              17770,
    daily_earnings:     15282.2,
    hourly_earnings:    0,
    revenue_days:       49,
    total_income:       748827.8,
    required_vip_level: 0,
    image_url:          '/assets/images/saree-vip4.jpg',
    badge:              'VIP.0',
    is_active:          true,
  },
  {
    name:               'Purchase upgrade to VIP5',
    type:               'stable',
    price:              27770,
    daily_earnings:     28000,
    hourly_earnings:    0,
    revenue_days:       49,
    total_income:       1372000,
    required_vip_level: 0,
    image_url:          '/assets/images/refinery-3.jpg',
    badge:              'VIP.0',
    is_active:          true,
  },
]

const seed = async () => {
  const db  = mongoose.connection.db
  const col = db.collection('products')

  console.log('🌱 Seeding stable plans...')
  await col.deleteMany({ type: 'stable' })

  const result = await col.insertMany(STABLE_PLANS_DATA)
  console.log(`  ✅ Inserted ${result.insertedCount} stable plans`)
}

if (require.main === module) {
  connect().then(seed).then(disconnect)
} else {
  module.exports = seed
}