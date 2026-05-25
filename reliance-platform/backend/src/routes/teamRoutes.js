const router = require('express').Router()
const auth   = require('../middleware/authMiddleware')
const ctrl   = require('../controllers/teamController')

router.get('/',            auth, ctrl.getTeam)
router.get('/details',     auth, ctrl.getTeamDetails)
router.get('/commissions', auth, ctrl.getCommissions)

module.exports = router