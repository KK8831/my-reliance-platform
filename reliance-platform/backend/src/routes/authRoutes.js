const router       = require('express').Router()
const ctrl         = require('../controllers/authController')
const { otpLimiter, loginLimiter } = require('../middleware/rateLimiter')

router.post('/send-otp',   otpLimiter,   ctrl.sendOtp)
router.post('/verify-otp',               ctrl.verifyOtp)
router.post('/register',                 ctrl.register)
router.post('/login',      loginLimiter, ctrl.login)

module.exports = router