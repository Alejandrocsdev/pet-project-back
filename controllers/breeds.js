const { Breed } = require('../models')

const { asyncError } = require('../middlewares')

const CustomError = require('../utils/CustomError')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const schema = Joi.object({ name: Joi.string().required() })

class BreedsController extends Validator {
  constructor() {
    super(schema)
  }

  getBreeds = asyncError(async (req, res, next) => {
    const breeds = await Breed.findAll()

    sucRes(res, 200, 'Get all Breeds table data successfully.', breeds)
  })

  getBreed = asyncError(async (req, res, next) => {
    const { breedId } = req.params
    const breed = await Breed.findByPk(breedId)
    this.validatePk(breed)

    sucRes(res, 200, `Get Breeds table data from id ${breedId} successfully.`, breed)
  })

  postBreed = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { name } = req.body

    const breed = await Breed.create({ name })

    sucRes(res, 201, `Created new Breeds table data successfully.`, breed)
  })

  putBreed = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { name } = req.body

    const { breedId } = req.params
    const [breed, preserved] = await Promise.all([
      Breed.findByPk(breedId),
      Breed.findOne({ where: { name: 'Other' } })
    ])
    this.validatePk(breed)
    this.validatePreserved(breed.name, preserved.name)

    await Breed.update({ name }, { where: { id: breedId } })

    sucRes(res, 200, `Updated table data with id ${breedId} successfully.`)
  })

  deleteBreed = asyncError(async (req, res, next) => {
    const { breedId } = req.params
    const [breed, preserved] = await Promise.all([
      Breed.findByPk(breedId),
      Breed.findOne({ where: { name: 'Other' } })
    ])
    this.validatePk(breed)
    this.validatePreserved(breed.name, preserved.name)

    await Breed.destroy({ where: { id: breedId } })

    sucRes(res, 200, `Deleted table data with id ${breedId} successfully.`)
  })
}

module.exports = new BreedsController()
