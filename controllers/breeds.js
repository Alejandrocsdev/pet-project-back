const { Breed } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

class BreedsController {
  getBreeds = asyncError(async (req, res, next) => {
    const breeds = await Breed.findAll()
    sucRes(res, 200, 'Get data successfully.', breeds)
  })
}

module.exports = new BreedsController()
