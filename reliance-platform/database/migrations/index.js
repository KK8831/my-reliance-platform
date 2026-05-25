const { connect, disconnect } = require('../connection')
const createIndexes = require('./001_create_indexes')
const createVipLevels = require('./002_create_vip_levels')
const createProducts  = require('./003_create_products')
const createNotices   = require('./004_create_notices')

const runMigrations = async () => {
  await connect()
  console.log('\n🚀 Running migrations...\n')

  await createIndexes()
  await createVipLevels()
  await createProducts()
  await createNotices()

  console.log('\n✅ All migrations completed.\n')
  await disconnect()
}

runMigrations().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})