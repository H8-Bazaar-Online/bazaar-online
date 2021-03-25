const router = require('express').Router()
const MerchantController = require('../controllers/merchantController')
const {authenticate} = require('../middlewares/authenticate')
const { authorizeCustomer } = require('../middlewares/authorize')
// const { authorizationAdmin } = require('../middlewares/authorization')

router.use(authenticate)
router.get('/', MerchantController.getAllMerchantByUser)
router.get('/all', MerchantController.getAllMerchant)
// router.get('', MerchantController.getAllMerchantCustomer)
router.post('/', MerchantController.createMerchant)

// router.use('/:merchantid', authorizationAdmin)
router.get('/:merchantid', MerchantController.getMerchantById)
router.put('/:merchantid', MerchantController.updateMerchant)
router.delete('/:merchantid', MerchantController.deleteMerchant)

// router.use('/:id', authorizeCustomer)
// router.get('/customer-merchants', MerchantController.getAllMerchantCustomer)
module.exports = router