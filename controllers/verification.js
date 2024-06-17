// Sequelize跟Models
const { sequelize, User, Otp } = require('../models')
// Sequelize的Operator
const { Op } = require('sequelize')
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
// 發送器模組(email/phone)
const sendMail = require('../config/email')
const sendSMS = require('../config/phone')
// 自定義錯誤訊息
const CustomError = require('../errors/CustomError')
// Body驗證條件(base)
const schema = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^09/).length(10)
}).xor('email', 'phone')
// Body驗證條件(extra)
const otpBody = { otp: Joi.string().length(8).required() }

class VerificationController extends Validator {
  constructor() {
    super(schema)
  }

  sendOTP = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    // method === 'email' || 'phone'
    const [method, methodData] = Object.entries(req.body)[0]

    // 生成OTP
    const otp = encrypt.otp()
    // OTP有效期限
    const expireTime = Date.now() + 10 * 60 * 1000

    const [hashedOtp, otpData] = await Promise.all([
      // OTP加密
      encrypt.hash(otp),
      // 檢查OTP是否已存在
      Otp.findOne({ where: { methodData } })
    ])

    // 建立事務
    const transaction = await sequelize.transaction()

    try {
      if (otpData) {
        // OTP已存在: 更新OTP
        await Otp.update({ otp: hashedOtp, expireTime, attempts: 0 }, { where: { methodData }, transaction })
      } else {
        // OTP不存在: 建立OTP
        await Otp.create({ methodData, otp: hashedOtp, expireTime }, { transaction })
      }

      // 提交事務
      await transaction.commit()

      if (method === 'email') {
        await sendMail(methodData, otp)
        sucRes(res, 200, 'Email with OTP sent successfully.')
      } else {
        const phone = '+886' + methodData.slice(1)
        await sendSMS(phone, otp)
        sucRes(res, 200, 'SMS with OTP sent successfully.')
      }
    } catch (err) {
      // 回滾事務
      await transaction.rollback()
      next(err)
    }
  })

  verifyOTP = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body, otpBody)
    // method === 'email' || 'phone'
    const [method, methodData] = Object.entries(req.body)[0]
    const { otp } = req.body

    // 讀取單一資料
    const otpData = await Otp.findOne({ where: { methodData } })
    // 驗證資料是否存在
    this.validateData([otpData], `Table data not found with ${method}: ${methodData}.`)

    // 取得加密OTP
    const hashedOtp = otpData.otp
    // 驗證OTP是否正確
    const isMatch = await encrypt.hashCompare(otp, hashedOtp)
    // 取得OTP有效期限
    const expireTime = otpData.expireTime
    // 取得嘗試輸入OTP次數
    const attempts = otpData.attempts + 1

    // 建立事務
    const transaction = await sequelize.transaction()

    try {
      // OTP正確/OTP失效/嘗試次數過多: 刪除Otp資訊
      if (isMatch || expireTime <= Date.now() || attempts > 3) {
        if (isMatch) {
          const capitalizedMethod = method.charAt(0).toUpperCase() + method.slice(1)
          sucRes(res, 200, `${capitalizedMethod} verified successfully.`)
        } else if (expireTime <= Date.now()) {
          throw new CustomError(401, 'OTP was expired.')
        } else if (attempts > 3) {
          throw new CustomError(429, 'Too many OTP input attempts.')
        }

        // 刪除Otp資訊
        await Otp.destroy({ where: { otp: hashedOtp } })
      }
      // 未達嘗試限制: 更新嘗試次數
      else {
        // 更新Otp資訊
        await Otp.update({ attempts }, { where: { otp: hashedOtp } })
        throw new CustomError(401, 'Wrong OTP input.')
      }

      // 提交事務
      await transaction.commit()
    } catch (err) {
      // 回滾事務
      await transaction.rollback()
      next(err)
    }
  })

  sendPassword = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)
    // method === 'email' || 'phone'
    const [method, methodData] = Object.entries(req.body)[0]

    // 生成臨時密碼
    const password = encrypt.password(12)

    const [hashedPassword, user] = await Promise.all([
      // 密碼加密
      encrypt.hash(password),
      // 檢查User是否存在
      User.findOne({ where: {
          [Op.or]: [{ email: methodData }, { phone: methodData }]
        }
      })
    ])
    // 驗證資料是否存在
    this.validateData([user])

    // 建立事務
    const transaction = await sequelize.transaction()

    try {
      // 更新User密碼
      await User.update({ password: hashedPassword }, { where: { id: user.id }, transaction })

      // 提交事務
      await transaction.commit()

      if (method === 'email') {
        await sendMail(methodData, password)
        sucRes(res, 200, 'Email with password sent successfully.')
      } else {
        const phone = '+886' + methodData.slice(1)
        await sendSMS(phone, password)
        sucRes(res, 200, 'SMS with password sent successfully.')
      }
    } catch (err) {
      // 回滾事務
      await transaction.rollback()
      next(err)
    }
  })
}

module.exports = new VerificationController()
