const router = require('express').Router()
const CartController = require('../controllers/cartController')
const {authenticate} = require('../middlewares/authenticate')
const { authorizeCustomer } = require('../middlewares/authorize')

router.use(authenticate)
router.get('/', CartController.getAll)
router.use('/:id', authorizeCustomer)
router.post('/:product_id', CartController.create)
router.delete('/:cart_id', CartController.delete)
router.patch('/:cart_id', CartController.updateQty)

module.exports = router