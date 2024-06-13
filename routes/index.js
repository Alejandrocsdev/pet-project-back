const { Router } = require('express')
const router = Router()

const users = require('./users')
const pets = require('./pets')
const breeds = require('./breeds')
const address = require('./address')

router.use('/users', users)
router.use('/pets', pets)
router.use('/breeds', breeds)
router.use('/address', address)

module.exports = router
