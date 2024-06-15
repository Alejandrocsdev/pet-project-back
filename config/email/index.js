// 引入發送信件模組
const nodemailer = require('nodemailer')

// 自定義錯誤訊息
const CustomError = require('../../errors/CustomError')

const fs = require('fs')
const path = require('path')

const textTemplatePath = path.resolve(__dirname, 'template.txt')
const htmlTemplatePath = path.resolve(__dirname, 'template.html')

const textTemplate = fs.readFileSync(textTemplatePath, 'utf8')
const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8')

// 設置郵件服務器配置
const config = {
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465 ? true : false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}

// 信件選項
const options = (email, OTP) => {
  const textEmailContent = textTemplate.replace('{{OTP}}', OTP)
  const htmlEmailContent = htmlTemplate.replace('{{OTP}}', OTP)

  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '信箱驗證碼',
    // text & html 擇一渲染(html優先)
    text: textEmailContent,
    html: htmlEmailContent
  }
}

// 發送信件函式
async function sendMail(email, otp) {
  // 郵件傳送器驗證
  const auth = config.auth

  // 驗證傳送器信箱
  if (!auth.user || !auth.user.includes('@gmail.com')) {
    throw new CustomError(500, 'Missing or incorrect email transporter sender email.')
  }

  // 驗證傳送器密碼
  if (!auth.pass || auth.pass.length !== 16) {
    throw new CustomError(500, 'Missing or incorrect email transporter App Password.')
  }

  // 創建可重複使用的發送郵件對象
  const transporter = nodemailer.createTransport(config)

  try {
    const info = await transporter.sendMail(options(email, otp))
  } catch (err) {
    throw new CustomError(500, 'Failed to send email.')
  }
}

module.exports = sendMail
