const { Router } = require('express')
const router = Router()

const { petsController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('petId', checkId)

router.route('/')
  .get(petsController.getPets)
  .post(petsController.postPet)

router.route('/:petId')
  .get(petsController.getPet)
//   .put(petsController.putPet)
//   .delete(petsController.deletePet)

module.exports = router
