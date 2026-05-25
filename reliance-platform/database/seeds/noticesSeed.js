const { connect, disconnect } = require('../connection')
const mongoose = require('mongoose')

const NOTICES_DATA = [
  {
    title:     'Lucky Roulette',
    content:   'Spin the lucky roulette wheel and win exciting prizes. Each product purchase gives you more chances to spin!',
    icon_url:  '/assets/icons/vip-icon.svg',
    type:      'lucky_roulette',
    is_active: true,
    createdAt: new Date('2026-03-22T09:33:33'),
  },
  {
    title:     'Daily Login Rewards',
    content:   'Log in every day to receive your daily reward. VIP members receive higher daily rewards. Don\'t miss out!',
    icon_url:  '/assets/icons/rewards-icon.svg',
    type:      'daily_login',
    is_active: true,
    createdAt: new Date('2026-03-22T09:32:30'),
  },
  {
    title:     'Referral Rewards',
    content:   'Invite friends and earn ₹50 for each successful referral. Build your team and earn Level 1 (35%), Level 2 (9%), Level 3 (1%) commissions.',
    icon_url:  '/assets/icons/team-icon.svg',
    type:      'referral',
    is_active: true,
    createdAt: new Date('2026-03-22T09:30:55'),
  },
  {
    title:     'Recharge Rewards',
    content:   'Recharge your account and receive bonus rewards. The more you recharge, the more you earn. Special bonuses for first-time deposits!',
    icon_url:  '/assets/icons/recharge-icon.svg',
    type:      'recharge',
    is_active: true,
    createdAt: new Date('2026-03-22T09:25:02'),
  },
  {
    title:     'VIP Upgrade Benefits',
    content:   'Upgrade your VIP level to unlock higher daily earnings, exclusive products, and priority customer support. VIP7 members earn up to ₹77,770 per day!',
    icon_url:  '/assets/icons/vip-icon.svg',
    type:      'general',
    is_active: true,
    createdAt: new Date('2026-03-22T09:00:00'),
  },
  {
    title:     'Platform Introduction',
    content:   'Welcome to Reliance Group platform. Everyone has the opportunity to become a shareholder. Through hard work, you can change your destiny and achieve financial freedom.',
    icon_url:  '/assets/icons/about-icon.svg',
    type:      'general',
    is_active: true,
    createdAt: new Date('2026-03-22T08:00:00'),
  },
]

const seed = async () => {
  const db  = mongoose.connection.db
  const col = db.collection('notices')

  console.log('🌱 Seeding notices...')
  await col.deleteMany({})

  const result = await col.insertMany(NOTICES_DATA)
  console.log(`  ✅ Inserted ${result.insertedCount} notices`)
}

if (require.main === module) {
  connect().then(seed).then(disconnect)
} else {
  module.exports = seed
}