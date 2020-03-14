const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const MongoStore = require('connect-mongo')(session)
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

const user = require('./routes/index')
const port = 8000

// setup for body-parser module
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Flashing messages unto request object.
app.use(
  session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: true
  })
)
app.use(flash())
// Parsing Cookies from request
app.use(cookieParser())

// Register passport for authentication.
app.use(passport.initialize())
app.use(passport.session())

// setup for loading static resources from 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

// require('./routes/index')(app, passport)

//Validating userController on Register
app.use(expressValidator())
app.use('/', user)

app.listen(port, () => console.log(`Server is running on port ${port}`))
