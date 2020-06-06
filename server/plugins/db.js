module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.set('useFindAndModify', false);
  mongoose.connect('mongodb://localhost:27017/vue-express-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  require('require-all')(__dirname + '../../models')
}