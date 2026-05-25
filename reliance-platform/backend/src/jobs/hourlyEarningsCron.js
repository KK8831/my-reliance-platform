const cron           = require('node-cron')
const earningsService= require('../services/earningsService')

// Runs every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running hourly earnings cron...')
  await earningsService.creditHourly()
  console.log('Hourly earnings credited.')
})