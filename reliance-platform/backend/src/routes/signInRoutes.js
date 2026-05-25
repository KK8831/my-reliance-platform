const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/signInController')

router.post('/',       auth, ctrl.signIn)
router.get('/record',  auth, ctrl.getRecord)

module.exports = router