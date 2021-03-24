const router = require('express').Router()
const HistoryController = require('../controllers/historyController')
const {authenticate} = require('../middlewares/authenticate')
const { authorizeCustomer } = require('../middlewares/authorize')

router.use(authenticate)
router.get('/', HistoryController.readHistories)
router.use('/:id', authorizeCustomer)
router.post('/:cart_id', HistoryController.createHistory)

module.exports = router