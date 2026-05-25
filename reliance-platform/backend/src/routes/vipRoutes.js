const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/vipController')

router.get('/', auth, ctrl.getLevels)

module.exports = router