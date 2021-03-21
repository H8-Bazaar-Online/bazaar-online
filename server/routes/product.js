const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {authenticate} = require('../middlewares/authenticate')
// const { authorizationAdmin } = require('../middlewares/authorization')
const { authorizeMerchant } = require('../middlewares/authorize')

router.use(authenticate)
router.post('/uploadimage', ProductController.uploadImage)
router.get('/',authorizeMerchant, ProductController.getAllProduct)
router.post('/', authorizeMerchant, ProductController.createProduct)

// router.use('/:id', authorizationAdmin)
router.get('/:id', ProductController.getProductById)
router.put('/:id', authorizeMerchant, ProductController.updateProduct)
router.delete('/:id', authorizeMerchant, ProductController.deleteProduct)

module.exports = router