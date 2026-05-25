const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/rechargeController')

router.post('/',         auth, ctrl.deposit)
router.get('/history',   auth, ctrl.getHistory)
router.post('/webhook',  ctrl.webhook)

module.exports = router