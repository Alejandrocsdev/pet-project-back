const authController = require('./auth')
const verificationController = require('./verification')
const usersController = require('./users')
const petsController = require('./pets')
const breedsController = require('./breeds')
const addressController = require('./address')

module.exports = {
  authController,
  verificationController,
  usersController,
  petsController,
  breedsController,
  addressController
}
