const { Breed } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

class BreedsController {
  getBreeds = asyncError(async (req, res, next) => {
    const breeds = await Breed.findAll()
    sucRes(res, 200, 'Get all Breeds table data successfully.', breeds)
  })

  getBreed = asyncError(async (req, res, next) => {
    const { breedId } = req.params
    const breed = await Breed.findByPk(breedId)
    sucRes(res, 200, `Get Breeds table row from id ${breedId} successfully.`, breed)
  })
}

module.exports = new BreedsController()
