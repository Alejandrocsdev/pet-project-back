const { User } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

// const schema = Joi.object({ name: Joi.string().required() })

class UsersController extends Validator {
  // constructor() {
  //   super(schema)
  // }

  getUsers = asyncError(async (req, res, next) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } })

    sucRes(res, 200, 'Get all Users table data successfully.', users)
  })

  getUser = asyncError(async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } })
    this.validatePk(user)

    sucRes(res, 200, `Get Users table data from id ${userId} successfully.`, user)
  })

  // postUser = asyncError(async (req, res, next) => {
  //   this.validateBody(req.body)
  //   const { name } = req.body

  //   const user = await User.create({ name })

  //   sucRes(res, 201, `Created new Users table data successfully.`, user)
  // })

  // putUser = asyncError(async (req, res, next) => {
  //   this.validateBody(req.body)
  //   const { name } = req.body

  //   const { userId } = req.params
  //   const [user, preserved] = await Promise.all([
  //     User.findByPk(userId),
  //     User.findOne({ where: { name: 'Other' } })
  //   ])
  //   this.validatePk(user)
  //   this.validatePreserved(user.name, preserved.name)

  //   await User.update({ name }, { where: { id: userId } })

  //   sucRes(res, 200, `Updated table data with id ${userId} successfully.`)
  // })

  // deleteUser = asyncError(async (req, res, next) => {
  //   const { userId } = req.params
  //   const [user, preserved] = await Promise.all([
  //     User.findByPk(userId),
  //     User.findOne({ where: { name: 'Other' } })
  //   ])
  //   this.validatePk(user)
  //   this.validatePreserved(user.name, preserved.name)

  //   await User.destroy({ where: { id: userId } })

  //   sucRes(res, 200, `Deleted table data with id ${userId} successfully.`)
  // })
}

module.exports = new UsersController()
