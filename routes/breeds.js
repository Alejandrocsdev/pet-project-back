const { Router } = require('express')
const router = Router()

const { breedsController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('breedId', checkId)

router.route('/').get(breedsController.getBreeds)

router.route('/:breedId').get(breedsController.getBreed)

module.exports = router
