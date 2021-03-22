const router = require('express').Router()

const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const merchantRouter = require('./merchant')
const MerchantController = require('../controllers/merchantController')
const ProductController = require('../controllers/productController')
const {authorizeCustomer} = require('../middlewares/authorize')

router.use('/users', userRouter)

router.use('/merchants', merchantRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

// router.use('/customer-merchants/:id', authorizeCustomer)
router.get('/customer-merchants', MerchantController.getAllMerchantCustomer)
router.get('/customer-products/:user_id', ProductController.getAllProductCustomer)


module.exports = router