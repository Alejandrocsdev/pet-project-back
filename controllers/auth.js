const { User } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

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
    this.validateBody(req.body)
    const { username, password, passwordCheck, email, phone, city, district, road, address } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    let user = await User.create({ username, password: hashedPassword, email, phone, city, district, road, address })
    user = user.toJSON()
    delete user.password

    sucRes(res, 201, `New user registered successfully.`, user)
  })

  login = (req, res, next) => {
    const user = req.user.toJSON()
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1y' })
    user.token = token
    delete user.password

    sucRes(res, 200, 'User login successfully.', user)
  }
}

module.exports = new AuthController()
