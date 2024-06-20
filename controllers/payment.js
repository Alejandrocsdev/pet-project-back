// Models
const { User } = require('../models')
// 異步錯誤處理中間件
const { asyncError } = require('../middlewares')
// 成功回應
const { sucRes } = require('../utils/customResponse')
// 綠界科技參數
const ecPay = require('../ecPay')
// 驗證
const Validator = require('../Validator')
// 驗證模組
const Joi = require('joi')
// Body驗證條件(base)
const schema = Joi.object({
  TotalAmount: Joi.string().required(),
  ItemName: Joi.string().required()
})

class PaymentController extends Validator {
  constructor() {
    super(schema)
  }

  payment = asyncError(async (req, res, next) => {
    // 驗證請求主體
    this.validateBody(req.body)

    // 請求參數(checkId中間件已驗證過)
    const { userId } = req.params

    const orderId = 'ASD4567'

    const ecPayParams = ecPay(orderId, req.body)

    sucRes(res, 200, 'Payment Started successfully.', ecPayParams)
  })
}

module.exports = new PaymentController()
