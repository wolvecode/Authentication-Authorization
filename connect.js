const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', {
  useMongoClient: true
})
mongoose.connection.on('error', error => console.log(error))
mongoose.Promise = global.Promise
