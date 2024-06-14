const { User } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const bcrypt = require('bcryptjs')

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(16).required(),
  passwordCheck: Joi.string().valid(Joi.ref('password')).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^09/).length(10).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  road: Joi.string().required(),
  address: Joi.string().required()
})

class AuthController extends Validator {
  constructor() {
    super(schema)
  }

  register = asyncError(async (req, res, next) => {
    this.validateBody(req.body, postBody)
    const { username, password, passwordCheck, email, phone, city, district, road, address } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashedPassword, email, phone, city, district, road, address })
    const userPlain = user.get({ plain: true })
    delete userPlain.password

    sucRes(res, 201, `Created new Users table data successfully.`, userPlain)
  })
}

module.exports = new AuthController()
