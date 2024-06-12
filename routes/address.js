const { Router } = require('express')
const router = Router()

const { addressController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('cityId', checkId)
router.param('districtId', checkId)
// router.param('roadId', checkId)

router.get('/cities', addressController.getCities)
router.get('/districts', addressController.getDistricts)
// router.get('/roads', addressController.getRoads)

router.get('/cities/:cityId', addressController.getCity)
router.get('/districts/:districtId', addressController.getDistrict)
// router.get('/roads/:road', addressController.getRoad)

module.exports = router
