const { Router } = require('express')
const router = Router()

const { breedsController } = require('../controllers')

router.route('/').get(breedsController.getBreeds)

module.exports = router
