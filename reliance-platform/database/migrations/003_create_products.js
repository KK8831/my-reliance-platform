const mongoose = require('mongoose')

module.exports = async () => {
  console.log('📌 Creating products collection schema...')
  const db = mongoose.connection.db

  await db.command({
    collMod: 'products',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'type', 'price'],
        properties: {
          name:               { bsonType: 'string' },
          type:               { bsonType: 'string', enum: ['stable', 'daily', 'activity'] },
          price:              { bsonType: 'double', minimum: 1 },
          daily_earnings:     { bsonType: 'double', minimum: 0 },
          hourly_earnings:    { bsonType: 'double', minimum: 0 },
          revenue_days:       { bsonType: 'int',    minimum: 1 },
          total_income:       { bsonType: 'double', minimum: 0 },
          required_vip_level: { bsonType: 'int',    minimum: 0, maximum: 7 },
          image_url:          { bsonType: 'string' },
          badge:              { bsonType: 'string' },
          is_active:          { bsonType: 'bool' },
        },
      },
    },
    validationLevel: 'moderate',
  }).catch(() => console.log('  ℹ️  Products collection will be created on first insert'))

  console.log('✅ Products migration complete')
}