const { Router } = require('express')
const router = Router()

const pets = require('./pets')
const breeds = require('./breeds')
const address = require('./address')

router.use('/pets', pets)
router.use('/breeds', breeds)
router.use('/address', address)

module.exports = router
