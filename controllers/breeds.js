const { Breed } = require('../models')

// 引入成功回應模組
const { sucRes } = require('../utils/response')

class BreedsController {
  getBreeds = async (req, res) => {
    const breeds = await Breed.findAll()
    sucRes(res, 200, 'Get data successfully.', breeds)
  }
}

module.exports = new BreedsController()
