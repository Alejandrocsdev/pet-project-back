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
// 使用cors中間件
app.use(cors())

app.get('/', (req, res) => {
  res.send('root')
})

// 啟動並監聽伺服器運行
app.listen(port, () => console.info(`Server running on port: ${port}`))
