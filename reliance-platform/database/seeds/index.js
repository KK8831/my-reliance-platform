const { connect, disconnect } = require('../connection')
const seedVipLevels    = require('./vipLevelsSeed')
const seedStablePlans  = require('./stablePlansSeed')
const seedDailyPlans   = require('./dailyPlansSeed')
const seedActivityPlans= require('./activityPlansSeed')
const seedNotices      = require('./noticesSeed')
const seedAdmin        = require('./adminSeed')

const runAllSeeds = async () => {
  await connect()
  console.log('\n🌱 Running all seeds...\n')

  await seedVipLevels()
  await seedStablePlans()
  await seedDailyPlans()
  await seedActivityPlans()
  await seedNotices()
  await seedAdmin()

  console.log('\n✅ All seeds completed successfully.\n')
  await disconnect()
}

runAllSeeds().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})