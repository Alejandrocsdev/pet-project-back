const { Router } = require('express')
const router = Router()

const breeds = require('./breeds')
const address = require('./address')

router.use('/breeds', breeds)
router.use('/address', address)

module.exports = router
