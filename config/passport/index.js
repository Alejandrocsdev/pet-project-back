const passport = require('passport')

const localStrategy = require('./local')

passport.use(localStrategy)

const passportInit = passport.initialize()
const loginAuth = passport.authenticate('local', { session: false })

module.exports = { passportInit, loginAuth }
