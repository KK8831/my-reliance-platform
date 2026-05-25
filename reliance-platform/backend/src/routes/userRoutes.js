const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/userController')

router.get('/',         auth, ctrl.getProfile)
router.get('/profile',  auth, ctrl.getProfile)
router.get('/balance',  auth, ctrl.getBalance)
router.patch('/profile',auth, ctrl.updateProfile)

module.exports = router