const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const { withdrawLimiter } = require('../middleware/rateLimiter')
const ctrl   = require('../controllers/withdrawController')

router.post('/',           auth, withdrawLimiter, ctrl.requestWithdrawal)
router.get('/history',     auth, ctrl.getHistory)
router.post('/bank-card',  auth, ctrl.addBankCard)
router.get('/bank-cards',  auth, ctrl.getBankCards)

module.exports = router