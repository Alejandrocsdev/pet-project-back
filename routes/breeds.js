const { Router } = require('express')
const router = Router()

const { breedsController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('breedId', checkId)

router.route('/')
  .get(breedsController.getBreeds)
  .post(breedsController.postBreed)

router.route('/:breedId')
  .get(breedsController.getBreed)
  .put(breedsController.putBreed)

module.exports = router
