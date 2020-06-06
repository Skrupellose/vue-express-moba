const express = require('express')
const app = express()

app.set('secret', '!@#')
app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('server start in 3000')
})