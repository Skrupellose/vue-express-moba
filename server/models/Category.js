const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    // 类型是mongoose数据库里面的objectID,ref关联Category模型，集合关联
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
})
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)