const { Breed } = require('../models')

class BreedsController {
  getBreeds = async (req, res) => {
    const breeds = await Breed.findAll()
    res.json({ status: 'Success', message: 'Get data successfully.', result: breeds })
  }
}

module.exports = new BreedsController()
