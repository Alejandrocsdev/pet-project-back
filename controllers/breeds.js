// Models
const { Breed } = require('../models')
// 異步錯誤處理中間件
const { asyncError } = require('../middlewares')
// 成功回應
const { sucRes } = require('../utils/customResponse')
// 驗證
const Validator = require('../Validator')
// 驗證模組
const Joi = require('joi')
// Body驗證條件(base)
const schema = Joi.object({ name: Joi.string().required() })

class BreedsController extends Validator {
  constructor() {
    super(schema)
  }

  getBreeds = asyncError(async (req, res, next) => {
    // 讀取全部資料
    const breeds = await Breed.findAll()

    sucRes(res, 200, 'Get all Breeds table data successfully.', breeds)
  })

  getBreed = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { breedId } = req.params
    // 讀取單一資料
    const breed = await Breed.findByPk(breedId)
    // 驗證資料是否存在
    this.validateData([breed])

    sucRes(res, 200, `Get Breeds table data from id ${breedId} successfully.`, breed)
  })

  postBreed = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { name } = req.body

    // 建立Breed資訊
    const breed = await Breed.create({ name })

    sucRes(res, 201, `Created new Breeds table data successfully.`, breed)
  })

  putBreed = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { name } = req.body

    // 請求參數(checkId中間件已驗證過)
    const { breedId } = req.params
    // 讀取單一資料
    const [breed, preserved] = await Promise.all([
      Breed.findByPk(breedId),
      Breed.findOne({ where: { name: 'Other' } })
    ])
    // 驗證資料是否存在
    this.validateData([breed])
    // 驗證更新資料是否包含保留資料
    this.validatePreserved(breed.name, preserved.name)

    // 更新Breed資訊
    await Breed.update({ name }, { where: { id: breedId } })

    sucRes(res, 200, `Updated table data with id ${breedId} successfully.`)
  })

  deleteBreed = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { breedId } = req.params
    // 讀取單一資料
    const [breed, preserved] = await Promise.all([
      Breed.findByPk(breedId),
      Breed.findOne({ where: { name: 'Other' } })
    ])
    // 驗證資料是否存在
    this.validateData([breed])
    // 驗證更新資料是否包含保留資料
    this.validatePreserved(breed.name, preserved.name)

    // 刪除Breed資訊
    await Breed.destroy({ where: { id: breedId } })

    sucRes(res, 200, `Deleted table data with id ${breedId} successfully.`)
  })
}

module.exports = new BreedsController()
