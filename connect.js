const mongoose = require('mongoose')

//connection to the mongo database
mongoose
  .connect('mongodb://localhost/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('connected to database'))
  .catch(err => console.err('inavlid connection'))
