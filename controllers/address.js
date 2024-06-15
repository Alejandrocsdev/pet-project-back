const { City, District, Road } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const schema = Joi.object({
  limit: Joi.number().integer().min(0),
  offset: Joi.number().integer().min(0)
})

class AddressController extends Validator {
  constructor() {
    super(schema)
  }

  // 全台22縣市
  getCities = asyncError(async (req, res, next) => {
    const cities = await City.findAll()

    sucRes(res, 200, 'Get all Cities table data successfully.', cities)
  })

  // 單一縣市(最高行政區域數量37)
  getCity = asyncError(async (req, res, next) => {
    const { cityId } = req.params

    const city = await City.findByPk(cityId, {
      include: [
        {
          model: District,
          as: 'districts'
        }
      ]
    })
    this.validateData([city])

    sucRes(res, 200, `Get Breeds table data from id ${cityId} successfully.`, city)
  })

  // 全台361行政區域
  getDistricts = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { limit = 10, offset = 0 } = req.body

    const districts = await District.findAll({
      limit: Number(limit),
      offset: Number(offset)
    })

    sucRes(res, 200, 'Get all Districts table data successfully.', districts)
  })

  // 單一行政區域(最高路名數量745)
  getDistrict = asyncError(async (req, res, next) => {
    const { districtId } = req.params

    const district = await District.findByPk(districtId, {
      include: [
        {
          model: Road,
          as: 'roads'
        }
      ]
    })
    this.validateData([district])

    sucRes(res, 200, `Get Districts table data from id ${districtId} successfully.`, district)
  })

  // 全台35026路名(含不同行政區相同路名)
  getRoads = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const { limit = 10, offset = 0 } = req.body

    const roads = await Road.findAll({
      limit: Number(limit),
      offset: Number(offset)
    })

    sucRes(res, 200, 'Get all Roads table data successfully.', roads)
  })

  // 單一路名
  getRoad = asyncError(async (req, res, next) => {
    const { roadId } = req.params
    const road = await Road.findByPk(roadId)
    this.validateData([road])

    sucRes(res, 200, `Get Roads table data from id ${roadId} successfully.`, road)
  })
}

module.exports = new AddressController()
