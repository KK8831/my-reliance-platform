const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/noticeController')

router.get('/',     auth, ctrl.getAll)
router.get('/:id',  auth, ctrl.getOne)

module.exports = router