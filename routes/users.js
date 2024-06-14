const { Router } = require('express')
const router = Router()

const { usersController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('userId', checkId)

router.route('/')
  .get(usersController.getUsers)

router.route('/:userId')
  .get(usersController.getUser)
  .put(usersController.putUser)
  .delete(usersController.deleteUser)

module.exports = router
