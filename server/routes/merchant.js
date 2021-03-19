const router = require('express').Router()
const MerchantController = require('../controllers/merchantController')
const {authenticate} = require('../middlewares/authenticate')
// const { authorizationAdmin } = require('../middlewares/authorization')

router.use(authenticate)
router.get('/', MerchantController.getAllMerchant)
router.post('/', MerchantController.createMerchant)

// router.use('/:merchantid', authorizationAdmin)
router.get('/:merchantid', MerchantController.getMerchantById)
router.put('/:merchantid', MerchantController.updateMerchant)
router.delete('/:merchantid', MerchantController.deleteMerchant)
module.exports = router