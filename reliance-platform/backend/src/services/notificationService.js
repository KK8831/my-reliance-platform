module.exports = {
  sendTelegram: async (message) => {
    // Integrate Telegram Bot API here
    console.log('Telegram notification:', message)
  },

  sendSms: async (phone, message) => {
    console.log(`SMS to ${phone}: ${message}`)
  },
}