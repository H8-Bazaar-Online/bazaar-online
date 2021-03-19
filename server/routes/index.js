const router = require('express').Router()

const userRouter = require('./user')
const productRouter = require('./product')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')
const merchantRouter = require('./merchant')

router.use('/users', userRouter)
router.use('/merchants', merchantRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/transaction', transactionRouter)

module.exports = router