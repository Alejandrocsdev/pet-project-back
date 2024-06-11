const { Router } = require('express')
const router = Router()

const { breedsController } = require('../controllers')

router.route('/')
  .get(breedsController.getBreeds)

router.route('/:breedId')
  .get(breedsController.getBreed)

module.exports = router
