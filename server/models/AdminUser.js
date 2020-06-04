const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  },
})

const model =  mongoose.model('AdminUser', schema)
module.exports = model