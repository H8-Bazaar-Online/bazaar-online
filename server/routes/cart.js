const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const { authorizationCustomer } = require('../middlewares/authorization')

router.use(authentication)
router.get('/', CartController.getAllCartById)
router.post('/:id', CartController.createCart)

router.use('/:id', authorizationCustomer)
router.put('/:id', CartController.updateQuantity)
router.delete('/:id', CartController.deleteCart)

module.exports = router