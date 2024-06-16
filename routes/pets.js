const { Router } = require('express')
const router = Router()

const { petsController } = require('../controllers')

const { upload, checkId } = require('../middlewares')

const storageType = process.env.STORAGE_TYPE || 'local'

router.param('petId', checkId)

router.route('/')
  .get(petsController.getPets)
  .post(upload(storageType), petsController.postPet)

router.route('/:petId')
  .get(petsController.getPet)
  .put(upload(storageType), petsController.putPet)
  .delete(petsController.deletePet)

module.exports = router
