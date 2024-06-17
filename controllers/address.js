// Models
const { City, District, Road } = require('../models')
// 異步錯誤處理中間件
const { asyncError } = require('../middlewares')
// 成功回應
const { sucRes } = require('../utils/customResponse')
// 驗證
const Validator = require('../Validator')
// 驗證模組
const Joi = require('joi')
// Body驗證條件(base)
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
    // 讀取全部資料
    const cities = await City.findAll()

    sucRes(res, 200, 'Get all Cities table data successfully.', cities)
  })

  // 單一縣市(最高行政區域數量37)
  getCity = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { cityId } = req.params
    // 讀取單一資料
    const city = await City.findByPk(cityId, {
      include: [
        { model: District, as: 'districts' }
      ]
    })
    // 驗證資料是否存在
    this.validateData([city])

    sucRes(res, 200, `Get Breeds table data from id ${cityId} successfully.`, city)
  })

  // 全台361行政區域
  getDistricts = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { limit = 10, offset = 0 } = req.body

    // 讀取全部資料
    const districts = await District.findAll({
      limit: Number(limit),
      offset: Number(offset)
    })

    sucRes(res, 200, 'Get all Districts table data successfully.', districts)
  })

  // 單一行政區域(最高路名數量745)
  getDistrict = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { districtId } = req.params

    // 讀取單一資料
    const district = await District.findByPk(districtId, {
      include: [
        { model: Road, as: 'roads' }
      ]
    })
    // 驗證資料是否存在
    this.validateData([district])

    sucRes(res, 200, `Get Districts table data from id ${districtId} successfully.`, district)
  })

  // 全台35026路名(含不同行政區相同路名)
  getRoads = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { limit = 10, offset = 0 } = req.body

    // 讀取全部資料
    const roads = await Road.findAll({
      limit: Number(limit),
      offset: Number(offset)
    })

    sucRes(res, 200, 'Get all Roads table data successfully.', roads)
  })

  // 單一路名
  getRoad = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { roadId } = req.params

    // 讀取單一資料
    const road = await Road.findByPk(roadId)
    // 驗證資料是否存在
    this.validateData([road])

    sucRes(res, 200, `Get Roads table data from id ${roadId} successfully.`, road)
  })
}

module.exports = new AddressController()
