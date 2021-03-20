const router = require('express').Router()
const CartController = require('../controllers/cartController')
const {authenticate} = require('../middlewares/authenticate')
const { authorizeCustomer } = require('../middlewares/authorize')

router.use(authenticate)
router.get('/', CartController.getAll)
router.post('/:product_id', CartController.create)

router.use('/:id', authorizeCustomer)
router.delete('/:id', CartController.delete)

module.exports = router