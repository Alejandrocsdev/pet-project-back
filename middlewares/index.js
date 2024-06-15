const upload = require('./multer')
const checkId = require('./checkId')
const defaultRoute = require('./defaultRoute')
const asyncError = require('./asyncError')
const globalError = require('./globalError')

module.exports = { upload, checkId, defaultRoute, asyncError, globalError }
