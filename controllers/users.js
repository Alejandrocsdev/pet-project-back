const { User, Pet } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const bcrypt = require('bcryptjs')

const schema = Joi.object({
  password: Joi.string().min(8).max(16).optional(),
  passwordCheck: Joi.string().valid(Joi.ref('password')).when('password', { is: Joi.exist(), then: Joi.required() }),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^09/).length(10).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  road: Joi.string().required(),
  address: Joi.string().required()
})

class UsersController extends Validator {
  constructor() {
    super(schema)
  }

  getUsers = asyncError(async (req, res, next) => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: { model: Pet, as: 'pets' }
    })

    sucRes(res, 200, 'Get all Users table data successfully.', users)
  })

  getUser = asyncError(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: { model: Pet, as: 'pets' }
    })
    this.validatePk([user])

    sucRes(res, 200, `Get Users table data from id ${userId} successfully.`, user)
  })

  putUser = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { password, passwordCheck, email, phone, city, district, road, address } = req.body

    const { userId } = req.params
    const user = await User.findByPk(userId)
    this.validatePk([user])

    const updateData = { email, phone, city, district, road, address }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateData.password = hashedPassword
    }

    await User.update(updateData, { where: { id: userId } })

    sucRes(res, 200, `Updated table data with id ${userId} successfully.`)
  })

  deleteUser = asyncError(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findByPk(userId)
    this.validatePk([user])

    await User.destroy({ where: { id: userId } })

    sucRes(res, 200, `Deleted table data with id ${userId} successfully.`)
  })
}

module.exports = new UsersController()
