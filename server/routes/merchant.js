const router = require('express').Router()
const MerchantController = require('../controllers/merchantController')
// const authentication = require('../middlewares/authentication')
// const { authorizationAdmin } = require('../middlewares/authorization')

router.get('/', MerchantController.getAllMerchant)
// router.use(authentication)
router.post('/', MerchantController.createMerchant)

// router.use('/:merchantid', authorizationAdmin)
router.get('/:merchantid', MerchantController.getMerchantById)
router.put('/:merchantid', MerchantController.updateMerchant)
router.delete('/:merchantid', MerchantController.deleteMerchant)
module.exports = router