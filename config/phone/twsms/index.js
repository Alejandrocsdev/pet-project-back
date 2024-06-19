const axios = require('axios')

const BASE_API = process.env.TWSMS_API
const username = process.env.TWSMS_USERNAME
const password = process.env.TWSMS_PASSWORD

// 自定義錯誤訊息
const CustomError = require('../../../errors/CustomError')

function formatDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}${month}${day}${hours}${minutes}`
}

const drurl = process.env.TWSMS_DRURL ? `drurl=${process.env.TWSMS_DRURL}&` : ''
const drurl_check = drurl ? 'Y' : 'N'
const optional = `&sendTime=${formatDate()}&expirytime=28800&mo=N&${drurl}drurl_check=${drurl_check}&lmsg=N`

async function twsms(phone, otp) {
  const message = `Your OTP verification is: ${otp}.`
  const API = `${BASE_API}?username=${username}&password=${password}&mobile=${phone}&message=${message}${optional}`
  console.log(API)
  try {
    if (!username) throw new CustomError(500, 'Missing TwSMS username.')
    if (!password) throw new CustomError(500, 'Missing TwSMS password.')

    await axios.get(API)
  } catch (err) {
    throw new CustomError(500, 'Failed to send OTP. (TwSMS)')
  }
}

module.exports = twsms
