const otpStore = new Map()

const generate = () => Math.floor(100000 + Math.random() * 900000).toString()

module.exports = {
  send: async (phone) => {
    const otp = generate()
    otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 })
    console.log(`OTP for ${phone}: ${otp}`)
    return true
  },

  verify: (phone, otp) => {
    const record = otpStore.get(phone)
    if (!record) return false
    if (Date.now() > record.expiresAt) { otpStore.delete(phone); return false }
    if (record.otp !== otp) return false
    otpStore.delete(phone)
    return true
  },
}