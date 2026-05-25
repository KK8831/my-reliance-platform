const { connect, disconnect } = require('../connection')
const mongoose = require('mongoose')

const dropAll = async () => {
  await connect()
  const db = mongoose.connection.db

  const collections = [
    'users', 'products', 'orders', 'transactions',
    'teams', 'commissions', 'viplevels', 'notices',
    'bankcards', 'dailysignins',
  ]

  console.log('\n⚠️  Dropping all collections...\n')
  for (const col of collections) {
    try {
      await db.collection(col).drop()
      console.log(`  🗑️  Dropped: ${col}`)
    } catch {
      console.log(`  ℹ️  Skipped (not found): ${col}`)
    }
  }

  console.log('\n✅ All collections dropped.\n')
  await disconnect()
}

dropAll().catch(err => {
  console.error('Drop failed:', err)
  process.exit(1)
})