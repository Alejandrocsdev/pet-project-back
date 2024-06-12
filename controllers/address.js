const { City, District, Road } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

class AddressController extends Validator {
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

  getDistricts = asyncError(async (req, res, next) => {
    const districts = await District.findAll({ include: [{ model: Road, as: 'roads' }] })

    sucRes(res, 200, 'Get all Districts table data successfully.', districts)
  })

  getDistrict = asyncError(async (req, res, next) => {
    const { districtId } = req.params
    const district = await District.findByPk(districtId, {
      include: [{ model: Road, as: 'roads' }]
    })
    this.validatePk(district)

    sucRes(res, 200, `Get Districts table data from id ${districtId} successfully.`, district)
  })
}

module.exports = new AddressController()
