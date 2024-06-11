const { Breed } = require('../models')

const { asyncError } = require('../middlewares')

const CustomError = require('../utils/CustomError')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

class BreedsController extends Validator {
  constructor() {
    super()
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
    const { name } = req.body
    const breed = await Breed.create({ name })
    
    sucRes(res, 201, `Created new Breeds table data successfully.`, breed)
  })
}

module.exports = new BreedsController()
