const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/productController')

router.get('/',    auth, ctrl.getProducts)
router.post('/buy',auth, ctrl.buyProduct)
router.get('/orders', auth, ctrl.getOrders)

module.exports = router