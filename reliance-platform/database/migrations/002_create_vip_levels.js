const mongoose = require('mongoose')

const VIP_LEVELS = [
  { level: 0, label: 'LV0', min_investment: 0,     badge_url: '/assets/badges/vip0-badge.png', description: 'Default level for all new users' },
  { level: 1, label: 'LV1', min_investment: 290,   badge_url: '/assets/badges/vip1-badge.png', description: 'Invest ₹290 to unlock VIP1 benefits' },
  { level: 2, label: 'LV2', min_investment: 2770,  badge_url: '/assets/badges/vip2-badge.png', description: 'Invest ₹2,770 to unlock VIP2 benefits' },
  { level: 3, label: 'LV3', min_investment: 7770,  badge_url: '/assets/badges/vip3-badge.png', description: 'Invest ₹7,770 to unlock VIP3 benefits' },
  { level: 4, label: 'LV4', min_investment: 17770, badge_url: '/assets/badges/vip4-badge.png', description: 'Invest ₹17,770 to unlock VIP4 benefits' },
  { level: 5, label: 'LV5', min_investment: 27770, badge_url: '/assets/badges/vip5-badge.png', description: 'Invest ₹27,770 to unlock VIP5 benefits' },
  { level: 6, label: 'LV6', min_investment: 37770, badge_url: '/assets/badges/vip6-badge.png', description: 'Invest ₹37,770 to unlock VIP6 benefits' },
  { level: 7, label: 'LV7', min_investment: 77770, badge_url: '/assets/badges/vip7-badge.png', description: 'Invest ₹77,770 to unlock VIP7 benefits' },
]

module.exports = async () => {
  console.log('📌 Creating VIP levels collection schema...')
  const db = mongoose.connection.db

  await db.command({
    collMod: 'viplevels',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['level', 'min_investment'],
        properties: {
          level:          { bsonType: 'int',    description: 'VIP level number 0-7' },
          label:          { bsonType: 'string', description: 'Level label e.g. LV0' },
          min_investment: { bsonType: 'double', description: 'Minimum investment required' },
          badge_url:      { bsonType: 'string' },
          description:    { bsonType: 'string' },
        },
      },
    },
    validationLevel: 'moderate',
  }).catch(() => console.log('  ℹ️  VIP levels collection will be created on first insert'))

  console.log('✅ VIP levels migration complete')
}