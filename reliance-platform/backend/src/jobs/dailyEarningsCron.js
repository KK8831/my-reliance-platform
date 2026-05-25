const cron           = require('node-cron')
const earningsService= require('../services/earningsService')

// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily earnings cron...')
  await earningsService.creditDaily()
  console.log('Daily earnings credited.')
})