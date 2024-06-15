const { Router } = require('express')
const router = Router()

const { petsController } = require('../controllers')

const { upload, checkId } = require('../middlewares')

router.param('petId', checkId)

router.route('/')
  .get(petsController.getPets)
  .post(upload.single('image'), petsController.postPet)

router.route('/:petId')
  .get(petsController.getPet)
  .put(upload.single('image'), petsController.putPet)
  .delete(petsController.deletePet)

module.exports = router
