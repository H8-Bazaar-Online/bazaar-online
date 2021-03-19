const router = require('express').Router()
const TransactionController = require('../controllers/transactionController')
// const authentication = require('../middlewares/authentication')

// router.use(authentication)

router.post('/', TransactionController.createTransaction)
// router.get('/', TransactionController.getAllHistoryTransaction)

module.exports = router 