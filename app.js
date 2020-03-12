const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const expressVal = require('express-validator')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const port = 8000
const user = require('./routes/index')
// setup for body-parser module
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// express session middleware setup
app.use(
  session({
    secret: 'W$q4=25*8%v-}UV',
    resave: true,
    saveUninitialized: true
  })
)

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize())
app.use(passport.session())

// setup for loading static resources from 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

// require('./routes/index')(app, passport)

//Validating userController on Register
app.use(expressVal())
app.use('/', user)

app.listen(port, () => console.log(`Server is running on port ${port}`))
