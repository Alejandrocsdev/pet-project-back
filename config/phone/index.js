const accountSid = process.env.Twilio_ACCOUNT_SID
const authToken = process.env.Twilio_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

// 自定義錯誤訊息
const CustomError = require('../../errors/CustomError')

const options = (phone, otp) => {
  return {
    from: process.env.Twilio_PHONE,
    to: phone,
    body: `Your OTP verification is: ${otp}.`
  }
}

async function sendSMS(phone, otp) {
  try {
    if (!accountSid) throw new CustomError(500, 'Missing Twilio Account SID.')
    if (!authToken) throw new CustomError(500, 'Missing Twilio Auth Token.')
    
    await client.messages.create(options(phone, otp))
  } catch (err) {
    throw new CustomError(500, 'Failed to send OTP.')
  }
}

module.exports = sendSMS
