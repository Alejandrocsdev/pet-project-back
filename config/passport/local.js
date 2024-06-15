const { Strategy } = require('passport-local')
const customFields = { usernameField: 'username', passwordField: 'password' }

const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const CustomError = require('../../errors/CustomError')

const verifyCallback = async (username, password, cb) => {
  try {
    const user = await User.findOne({ where: { username } })
    if (!user) throw new CustomError(404, 'Username not found.')
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new CustomError(401, 'Password incorrect.')
    cb(null, user)
  } catch (err) {
    cb(err)
  }
}

const localStrategy = new Strategy(customFields, verifyCallback)

module.exports = localStrategy
