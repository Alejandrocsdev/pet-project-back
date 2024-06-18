const { Router } = require('express')
const router = Router()

const { paymentController } = require('../controllers')

const { checkId } = require('../middlewares')

router.param('userId', checkId)

router.get('/:userId', paymentController.payment)

module.exports = router
