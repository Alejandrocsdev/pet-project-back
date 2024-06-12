const { City, District } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

class BreedsController extends Validator {
  getCities = asyncError(async (req, res, next) => {
    const cities = await City.findAll({ include: [{ model: District, as: 'districts' }] })

    sucRes(res, 200, 'Get all Cities table data successfully.', cities)
  })

  getCity = asyncError(async (req, res, next) => {
    const { cityId } = req.params
    const city = await City.findByPk(cityId, { include: [{ model: District, as: 'districts' }] })
    this.validatePk(city)

    sucRes(res, 200, `Get Breeds table data from id ${cityId} successfully.`, city)
  })
}

module.exports = new BreedsController()
