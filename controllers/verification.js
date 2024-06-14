const { Otp } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

// const schema = Joi.object({
//   name: Joi.string().required(),
//   age: Joi.number().integer().positive().required(),
//   size: Joi.valid('small', 'medium', 'large').required(),
//   image: Joi.string().allow(''),
//   breedId: Joi.number().integer().positive().required()
// })

class VerificationController extends Validator {
  // constructor() {
  //   super(schema)
  // }

  sendEmail = asyncError(async (req, res, next) => {

    sucRes(res, 200, 'Email sent successfully.')
  })

  verifyEmail = asyncError(async (req, res, next) => {

    sucRes(res, 200, 'Email verified successfully.')
  })

  sendPhone = asyncError(async (req, res, next) => {

    sucRes(res, 200, 'SMS sent successfully.')
  })

  verifyPhone = asyncError(async (req, res, next) => {

    sucRes(res, 200, 'Phone verified successfully.')
  })
}

module.exports = new VerificationController()
