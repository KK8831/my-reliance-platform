const cron = require('node-cron')

// Runs every day at midnight — placeholder for reset logic if needed
cron.schedule('0 0 * * *', () => {
  console.log('Sign-in reset cron running (handled via date check in controller).')
})