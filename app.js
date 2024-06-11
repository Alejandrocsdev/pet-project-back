// 啟動環境變數
require('dotenv').config()
// 後端框架
const express = require('express')
// 建立 Express 應用程式
const app = express()
// 設定伺服器端口
const port = Number(process.env.PORT) || 3000
// 中間件: 跨來源資源共用
const cors = require('cors')
// 引入路由模組
const routes = require('./routes')
// 引入預設(其他)路由模組
const defaultRoute = require('./middlewares/defaultRoute')
// 使用cors中間件
app.use(cors())
// 掛載路由中間件
app.use('/api', routes)
// 設數(其他)路由
app.all('*', defaultRoute)
// 啟動並監聽伺服器運行
app.listen(port, () => console.info(`Server running on port: ${port}`))
