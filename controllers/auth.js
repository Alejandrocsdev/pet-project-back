// Models
const { User } = require('../models')
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
  username: Joi.string().required(),
  password: Joi.string().min(8).max(16).required(),
  passwordCheck: Joi.string().valid(Joi.ref('password')).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^09/).length(10).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  road: Joi.string().required(),
  address: Joi.string().required()
})

class AuthController extends Validator {
  constructor() {
    super(schema)
  }

  register = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { username, password, passwordCheck, email, phone, city, district, road, address } = req.body

    // 密碼加密
    const hashedPassword = await encrypt.hash(password)

    // 建立User資訊
    let user = await User.create({ username, password: hashedPassword, email, phone, city, district, road, address })

    // 更新User回傳資料
    user = user.toJSON()
    delete user.password

    sucRes(res, 201, `New user registered successfully.`, user)
  })

  login = (req, res, next) => {
    // 取得User資訊
    const user = req.user.toJSON()

    // 生成token
    const token = encrypt.signToken(user.id, '1d')

    // 更新User回傳資料
    user.token = token
    delete user.password

    sucRes(res, 200, 'User login successfully.', user)
  }

  // protected = (req, res, next) => {
  //   const user = req.user

  //   sucRes(res, 200, 'Protected successfully.', user)
  // }
}

module.exports = new AuthController()
