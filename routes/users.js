const { Router } = require('express')
const router = Router()

const { usersController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('userId', checkId)

router.route('/')
  .get(usersController.getUsers)
  // .post(usersController.postuser)

router.route('/:userId')
  .get(usersController.getUser)
  // .put(usersController.putuser)
  // .delete(usersController.deleteuser)

module.exports = router
