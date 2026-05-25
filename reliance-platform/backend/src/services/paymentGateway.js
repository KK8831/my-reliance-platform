const Razorpay = require('razorpay')

let razorpayInstance = null

const getRazorpayInstance = () => {
  if (razorpayInstance) return razorpayInstance

  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET

  if (!key_id || key_id === 'YOUR_RAZORPAY_KEY_ID') {
    throw new Error('Razorpay keys are not configured in .env file.')
  }

  razorpayInstance = new Razorpay({ key_id, key_secret })
  return razorpayInstance
}

module.exports = {
  initiateDeposit: async ({ amount, channel, userId }) => {
    try {
      const instance = getRazorpayInstance()
      // Razorpay expects amount in paise (multiply by 100)
      const options = {
        amount: Math.round(amount * 100), 
        currency: 'INR',
        receipt: `receipt_${userId}_${Date.now()}`,
      }

      const order = await instance.orders.create(options)
      
      return {
        success: true,
        reference_id: order.id, // The Razorpay order ID
        payment_url: '', // We don't need a URL, frontend uses the SDK with the order ID
      }
    } catch (error) {
      console.error('Razorpay Error:', error)
      return { success: false, error: error.message || 'Failed to generate order' }
    }
  },
}