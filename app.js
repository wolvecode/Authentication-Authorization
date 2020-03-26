const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const routes = require('./routes/routes')
const secureRoute = require('./routes/secureRoute')

require('./connect')
require('./middleware/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/', passport.authenticate('jwt', { session: false }), secureRoute)

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

const port = 4000
app.listen(port, () => console.log(`Listening on port: ${port}`))
