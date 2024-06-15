const { sequelize, User, Otp } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const encrypt = require('../utils/encrypt')

const sendMail = require('../config/email')
const sendSMS = require('../config/phone')

const CustomError = require('../errors/CustomError')

const schema = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^09/).length(10)
}).xor('email', 'phone')

const otpBody = { otp: Joi.string().length(8).required() }

class VerificationController extends Validator {
  constructor() {
    super(schema)
  }

  sendOTP = asyncError(async (req, res, next) => {
    this.validateBody(req.body)
    const [method, methodData] = Object.entries(req.body)[0]

    const otp = encrypt.otp()
    const expireTime = Date.now() + 10 * 60 * 1000

    const [transaction, hashedOtp, otpData] = await Promise.all([
      // 開始事務
      sequelize.transaction(),
      // 加密OTP
      encrypt.hash(otp),
      // 檢查OTP是否已存在
      Otp.findOne({ where: { methodData } })
    ])

    try {
      if (otpData) {
        // 將最新OTP存至資料庫
        await Otp.update({ otp: hashedOtp, expireTime, attempts: 0 }, { where: { methodData } })
      } else {
        // 將OTP存至資料庫
        await Otp.create({ methodData, otp: hashedOtp, expireTime })
      }
      // 提交事務
      await transaction.commit()
    } catch (err) {
      // 如果發生錯誤，回滾事務
      await transaction.rollback()
      next(err)
    }

    if (method === 'email') {
      await sendMail(methodData, otp)
      sucRes(res, 200, 'Email sent successfully.')
    } else {
      const phone = '+886' + methodData.slice(1)
      await sendSMS(phone, otp)
      sucRes(res, 200, 'SMS sent successfully.')
    }
  })

  verifyOTP = asyncError(async (req, res, next) => {
    this.validateBody(req.body, otpBody)
    const [method, methodData] = Object.entries(req.body)[0]
    const [_, otp] = Object.entries(req.body)[1]

    // 檢查OTP是否已存在
    const otpData = await Otp.findOne({ where: { methodData } })
    this.validateData([otpData], `Table data not found with ${method}: ${methodData}.`)

    // 取得OTP
    const hashedOtp = otpData.otp
    // 檢查OTP是否正確
    const isMatch = await encrypt.hashCompare(otp, hashedOtp)
    // 取得OTP有效期限
    const expireTime = otpData.expireTime
    // 取得嘗試輸入OTP次數
    const attempts = otpData.attempts + 1

    if (isMatch || expireTime <= Date.now() || attempts > 3) {
      if (isMatch) {
        const capitalizedMethod = method.charAt(0).toUpperCase() + method.slice(1)
        sucRes(res,200,`${capitalizedMethod} verified successfully.`)
      } else if (expireTime <= Date.now()) {
        throw new CustomError(401, 'OTP was expired.')
      } else if (attempts > 3) {
        throw new CustomError(429, 'Too many OTP input attempts.')
      }

      // 刪除 Otps Table 資料
      await Otp.destroy({ where: { otp: hashedOtp } })
    } else {
      await Otp.update({ attempts }, { where: { otp: hashedOtp } })
      throw new CustomError(401, 'Wrong OTP input.')
    }
  })
}

module.exports = new VerificationController()
