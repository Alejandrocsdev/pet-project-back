// Models
const { User, Pet } = require('../models')
// 異步錯誤處理中間件
const { asyncError } = require('../middlewares')
// 成功回應
const { sucRes } = require('../utils/customResponse')
// 驗證
const Validator = require('../Validator')
// 驗證模組
const Joi = require('joi')
// 加密模組
const encrypt = require('../utils/encrypt')
// Body驗證條件(base)
const schema = Joi.object({
  password: Joi.string().min(8).max(16).optional(),
  passwordCheck: Joi.string().valid(Joi.ref('password')).when('password', { is: Joi.exist(), then: Joi.required() }),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^09/).length(10).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  road: Joi.string().required(),
  address: Joi.string().required()
})

class UsersController extends Validator {
  constructor() {
    super(schema)
  }

  getUsers = asyncError(async (req, res, next) => {
    // 讀取全部資料
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: { model: Pet, as: 'pets' }
    })

    sucRes(res, 200, 'Get all Users table data successfully.', users)
  })

  getUser = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { userId } = req.params
    // 讀取單一資料
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: { model: Pet, as: 'pets' }
    })
    // 驗證資料是否存在
    this.validateData([user])

    sucRes(res, 200, `Get Users table data from id ${userId} successfully.`, user)
  })

  putUser = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { password, passwordCheck, email, phone, city, district, road, address } = req.body

    // 請求參數(checkId中間件已驗證過)
    const { userId } = req.params
    // 讀取單一資料
    const user = await User.findByPk(userId)
    // 驗證資料是否存在
    this.validateData([user])

    // 欲更新資料(無未加密密碼)
    const updateData = { email, phone, city, district, road, address }

    // 如有更新密碼: 更新資料包含加密密碼
    if (password) {
      const hashedPassword = await encrypt.hash(password)
      updateData.password = hashedPassword
    }

    // 更新User資訊
    await User.update(updateData, { where: { id: userId } })

    sucRes(res, 200, `Updated table data with id ${userId} successfully.`)
  })

  deleteUser = asyncError(async (req, res, next) => {
    // 請求參數(checkId中間件已驗證過)
    const { userId } = req.params
    // 讀取單一資料
    const user = await User.findByPk(userId)
    // 驗證資料是否存在
    this.validateData([user])

    // 刪除User資訊
    await User.destroy({ where: { id: userId } })

    sucRes(res, 200, `Deleted table data with id ${userId} successfully.`)
  })
}

module.exports = new UsersController()
