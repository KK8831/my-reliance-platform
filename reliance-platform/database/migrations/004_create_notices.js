const mongoose = require('mongoose')

module.exports = async () => {
  console.log('📌 Creating notices collection schema...')
  const db = mongoose.connection.db

  await db.command({
    collMod: 'notices',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title'],
        properties: {
          title:     { bsonType: 'string' },
          content:   { bsonType: 'string' },
          icon_url:  { bsonType: 'string' },
          type:      { bsonType: 'string', enum: ['lucky_roulette', 'daily_login', 'referral', 'recharge', 'general'] },
          is_active: { bsonType: 'bool' },
        },
      },
    },
    validationLevel: 'moderate',
  }).catch(() => console.log('  ℹ️  Notices collection will be created on first insert'))

  console.log('✅ Notices migration complete')
}