const { Pet, Breed, User } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().positive().required(),
  size: Joi.valid('small', 'medium', 'large').required(),
  image: Joi.string().allow(''),
  breedId: Joi.number().integer().positive().required()
})

const postBody = { userId: Joi.number().integer().positive().required() }

class PetsController extends Validator {
  constructor() {
    super(schema)
  }

  getPets = asyncError(async (req, res, next) => {
    const pets = await Pet.findAll({
      include: [
        { model: Breed, as: 'breed' },
        { model: User, as: 'owner', attributes: { exclude: ['password'] } }
      ]
    })

    sucRes(res, 200, 'Get all Pets table data successfully.', pets)
  })

  getPet = asyncError(async (req, res, next) => {
    const { petId } = req.params
    const pet = await Pet.findByPk(petId, {
      include: [
        { model: Breed, as: 'breed' },
        { model: User, as: 'owner', attributes: { exclude: ['password'] } }
      ]
    })
    this.validateData([pet])

    sucRes(res, 200, `Get Pets table data from id ${petId} successfully.`, pet)
  })

  postPet = asyncError(async (req, res, next) => {
    this.validateBody(req.body, postBody)
    const { name, age, size, image, breedId, userId } = req.body

    const [breed, user] = await Promise.all([Breed.findByPk(breedId), User.findByPk(userId)])
    this.validateData([breed, user])

    const pet = await Pet.create({ name, age, size, image, breedId, userId })

    sucRes(res, 201, `Created new Pets table data successfully.`, pet)
  })

  putPet = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { name, age, size, image, breedId } = req.body

    const { petId } = req.params

    const [pet, breed] = await Promise.all([Pet.findByPk(petId), Breed.findByPk(breedId)])
    this.validateData([pet, breed])

    await Pet.update({ name, age, size, image, breedId }, { where: { id: petId } })

    sucRes(res, 200, `Updated table data with id ${petId} successfully.`)
  })

  deletePet = asyncError(async (req, res, next) => {
    const { petId } = req.params
    const pet = await Pet.findByPk(petId)
    this.validateData([pet])

    await Pet.destroy({ where: { id: petId } })

    sucRes(res, 200, `Deleted table data with id ${petId} successfully.`)
  })
}

module.exports = new PetsController()
