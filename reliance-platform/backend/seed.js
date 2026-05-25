require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./src/models/Product')
const VipLevel = require('./src/models/VipLevel')
const Notice = require('./src/models/Notice')

const STABLE_PRODUCTS = [
  { name: 'Stable Plan 1', price: 500, daily_earnings: 50, revenue_days: 30, type: 'stable', required_vip_level: 0 },
  { name: 'Stable Plan 2', price: 1500, daily_earnings: 165, revenue_days: 30, type: 'stable', required_vip_level: 0 },
  { name: 'Stable Plan 3', price: 4500, daily_earnings: 540, revenue_days: 35, type: 'stable', required_vip_level: 0 },
  { name: 'Stable Plan 4', price: 10000, daily_earnings: 1300, revenue_days: 35, type: 'stable', required_vip_level: 1 },
]

const DAILY_PRODUCTS = [
  { name: 'Daily Plan 1', price: 300, daily_earnings: 150, revenue_days: 3, type: 'daily', required_vip_level: 0 },
  { name: 'Daily Plan 2', price: 800, daily_earnings: 450, revenue_days: 3, type: 'daily', required_vip_level: 0 },
  { name: 'Daily Plan 3', price: 2000, daily_earnings: 1200, revenue_days: 4, type: 'daily', required_vip_level: 1 },
]

const ACTIVITY_PRODUCTS = [
  { name: 'Activity Plan 1', price: 1000, hourly_earnings: 100, revenue_days: 1, type: 'activity', required_vip_level: 1 },
  { name: 'Activity Plan 2', price: 2500, hourly_earnings: 275, revenue_days: 1, type: 'activity', required_vip_level: 1 },
]

const VIP_LEVELS = [
  { level: 0, min_investment: 0,     label: 'LV0' },
  { level: 1, min_investment: 290,   label: 'LV1' },
  { level: 2, min_investment: 2770,  label: 'LV2' },
  { level: 3, min_investment: 7770,  label: 'LV3' },
  { level: 4, min_investment: 17770, label: 'LV4' },
  { level: 5, min_investment: 27770, label: 'LV5' },
  { level: 6, min_investment: 37770, label: 'LV6' },
  { level: 7, min_investment: 77770, label: 'LV7' },
]

const NOTICES = [
  { title: 'Welcome to Reliance Platform!', content: 'Start investing today and earn daily returns.' },
  { title: 'New Activity Plans Available', content: 'Check out our new short-term high-yield activity plans.' },
]

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected.')

    console.log('Clearing existing products, VIP levels, and notices...')
    await Product.deleteMany({})
    await VipLevel.deleteMany({})
    await Notice.deleteMany({})

    console.log('Seeding products...')
    const allProducts = [...STABLE_PRODUCTS, ...DAILY_PRODUCTS, ...ACTIVITY_PRODUCTS]
    await Product.insertMany(allProducts)

    console.log('Seeding VIP levels...')
    await VipLevel.insertMany(VIP_LEVELS)

    console.log('Seeding notices...')
    await Notice.insertMany(NOTICES)

    console.log('Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seed()
