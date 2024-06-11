const { Breed } = require('../models')

const { sucRes } = require('../utils/customResponse')

class BreedsController {
  getBreeds = async (req, res, next) => {
    try {
      const breeds = await Breed.findAll()
      sucRes(res, 200, 'Get data successfully.', breeds)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new BreedsController()
