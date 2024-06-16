// 啟動環境變數
require('dotenv').config()
// 後端框架
const express = require('express')
// 建立 Express 應用程式
const app = express()
// 設定伺服器端口
const port = Number(process.env.PORT) || 3000
// 載入 Node.js 內建的 path 模組
const path = require('path')
// 
const helmet = require('helmet')
// 中間件: 跨來源資源共用
const cors = require('cors')
// 初始化 Passport 認證
const { passportInit } = require('./config/passport')
// 引入路由模組
const routes = require('./routes')
// 引入自訂中間件
const { defaultRoute, globalError } = require('./middlewares')
// 
app.use(helmet())
// 使用cors中間件
app.use(cors())
// 解析請求主體的 JSON 格式資料
app.use(express.json())
// 解析靜態資源的路徑
app.use('/uploads', express.static(path.join(__dirname, 'storage', 'local')))
// 使用 Passport 初始化中間件
app.use(passportInit)
// 掛載路由中間件
app.use('/api', routes)
// 設數(其他)路由中間件
app.all('*', defaultRoute)
// 全域錯誤訊息中間件
app.use(globalError)
// 啟動並監聽伺服器運行
app.listen(port, () => console.info(`Server running on port: ${port}`))
