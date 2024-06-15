const { sequelize, User, Otp } = require('../models')

const { asyncError } = require('../middlewares')

const { sucRes } = require('../utils/customResponse')

const Validator = require('../Validator')

const Joi = require('joi')

const encrypt = require('../utils/encrypt')

// const schema = Joi.object({
//   name: Joi.string().required(),
//   age: Joi.number().integer().positive().required(),
//   size: Joi.valid('small', 'medium', 'large').required(),
//   image: Joi.string().allow(''),
//   breedId: Joi.number().integer().positive().required()
// })

class VerificationController extends Validator {
  // constructor() {
  //   super(schema)
  // }

  sendEmail = asyncError(async (req, res, next) => {
    const { userId } = req.params
    
    const otp = encrypt.otp()
    const expireTime = Date.now() + 10 * 60 * 1000

    const [hashedOtp, user, transaction] = await Promise.all([
      // 加密OTP
      encrypt.hash(otp),
      // 取得 Users Table 特定 id 資料
      User.findByPk(userId),
      // 開始事務
      sequelize.transaction()
    ])

    this.validatePk([user])

    const otpData = await Otp.findOne({ where: { userId } })

    try {
      if (otpData) {
        // 將最新OTP存至資料庫
        await Otp.update({ otp: hashedOtp, expireTime, attempts: 0 }, { where: { userId } })
      } else {
        // 將OTP存至資料庫
        await Otp.create({ userId, otp: hashedOtp, expireTime })
      }
      // 提交事務
      await transaction.commit()
    } catch (err) {
      // 如果發生錯誤，回滾事務
      await transaction.rollback()
      next(err)
    }

    // const message = await sendOTP(user.phone, otp)
    // message.otp = otp

    sucRes(res, 200, 'Email sent successfully.')
  })

  verifyEmail = asyncError(async (req, res, next) => {
    sucRes(res, 200, 'Email verified successfully.')
  })

  sendPhone = asyncError(async (req, res, next) => {
    sucRes(res, 200, 'SMS sent successfully.')
  })

  verifyPhone = asyncError(async (req, res, next) => {
    sucRes(res, 200, 'Phone verified successfully.')
  })
}

module.exports = new VerificationController()
