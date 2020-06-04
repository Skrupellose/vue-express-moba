const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  categories: [{
    // 类型是mongoose数据库里面的objectID,ref关联Category模型，集合关联
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'Category'
  }],
  body: {
    type: String
  }
})

module.exports = mongoose.model('Article', schema)