// Sequelize跟Models
const { sequelize, User, Image } = require('../models')
// 異步錯誤處理中間件
const { asyncError } = require('../middlewares')
// 成功回應
const { sucRes } = require('../utils/customResponse')
// 上傳/刪除照片
const { uploadImage, deleteImage } = require('../storage')
// 照片存儲類型(local/imgur/cloudinary)
const storageType = process.env.STORAGE_TYPE || 'local'
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
  nickname: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^09/).length(10).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  road: Joi.string().required(),
  address: Joi.string().required()
})
// File驗證條件(base)
const fileSchema = Joi.object({
  mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
  size: Joi.number().max(3 * 1024 * 1024).required()
}).unknown(true)

class AuthController extends Validator {
  constructor() {
    super(schema)
  }

  register = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    const { username, password, passwordCheck, nickname, firstName, lastName, email, phone, city, district, road, address } = req.body
    // 驗證上傳照片(optional)
    this.validateImage(req.file, fileSchema)
    const { file } = req

    // 上傳照片(optional)
    const userImage = await uploadImage(file, storageType)
    const link = userImage?.link
    const deleteData = userImage?.deleteData

    // 密碼加密
    const hashedPassword = await encrypt.hash(password)

    // 建立事務
    const transaction = await sequelize.transaction()
    try {
      // 建立User資訊
      let user = await User.create(
        { username, password: hashedPassword, nickname, firstName, lastName, email, phone, city, district, road, address },
        { transaction }
      )
      // 建立Image資訊
      await Image.create(
        { link, deleteData, entityId: user.id, entityType: 'user' },
        { transaction }
      )

      // 提交事務
      await transaction.commit()

      // 如有上傳照片: 更新User資訊(包含image)
      if (userImage) {
        await user.reload({ include: [{ model: Image, as: 'avatar', attributes: ['link'] }] })
      }

      // 更新User回傳資料
      user = user.toJSON()
      delete user.password

      sucRes(res, 201, `New user registered successfully.`, user)
    } catch (err) {
      // 回滾事務
      await transaction.rollback()
      // 回滾storage照片新增
      if (deleteData) {
        await deleteImage(deleteData, storageType)
      }
      next(err)
    }
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
