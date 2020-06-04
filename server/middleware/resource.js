module.exports = Options => {
  return async (req, res, next) => {
    //使用inflection进行类名格式转换
  const modelName = require('inflection').classify(req.params.resource)
  req.Model = require(`../models/${modelName}`)
  next()
  }
}