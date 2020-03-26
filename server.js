const express = require('express')
const app = express()
require('./app')

//Starting server at port 4000
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}...`))
