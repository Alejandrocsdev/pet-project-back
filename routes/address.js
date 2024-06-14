const { Router } = require('express')
const router = Router()

const { addressController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('cityId', checkId)
router.get('/cities', addressController.getCities)
router.get('/cities/:cityId', addressController.getCity)

router.param('districtId', checkId)
router.get('/districts', addressController.getDistricts)
router.get('/districts/:districtId', addressController.getDistrict)

router.param('roadId', checkId)
router.get('/roads', addressController.getRoads)
router.get('/roads/:roadId', addressController.getRoad)

module.exports = router
