const axios = require('axios')

const BASE_API = process.env.TWSMS_API
const username = process.env.TWSMS_USERNAME
const password = process.env.TWSMS_PASSWORD

// 自定義錯誤訊息
const CustomError = require('../../../errors/CustomError')

const time = require('../../../utils/time')

const drurl = process.env.TWSMS_DRURL ? `drurl=${process.env.TWSMS_DRURL}&` : ''
const drurl_check = drurl ? 'Y' : 'N'
const optional = `&sendTime=${time.smsDate()}&expirytime=28800&mo=N&${drurl}drurl_check=${drurl_check}&lmsg=N`

async function twsms(phone, otp) {
  const message = `Your OTP verification is: ${otp}.`
  const API = `${BASE_API}?username=${username}&password=${password}&mobile=${phone}&message=${message}${optional}`
  try {
    if (!username) throw new CustomError(500, 'Missing TwSMS username.')
    if (!password) throw new CustomError(500, 'Missing TwSMS password.')

    await axios.get(API)
  } catch (err) {
    throw new CustomError(500, 'Failed to send OTP. (TwSMS)')
  }
}

module.exports = twsms
