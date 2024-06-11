// 引入回應模組
const { errRes } = require('../utils/response')

function defaultRoute(req, res, next) {
  errRes(res, 404, `Can't find ${req.originalUrl} on the server.`)
  next()
}

module.exports = defaultRoute
