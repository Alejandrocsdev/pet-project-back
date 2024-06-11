const { Router } = require('express')
const router = Router()

const breeds = require('./breeds')

router.use('/breeds', breeds)

module.exports = router
