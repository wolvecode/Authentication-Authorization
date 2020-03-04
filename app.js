const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }))
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

//setup for laoding static resources from 'public' diresctory
app.use(express.static(path.join(__dirname, 'public')))

//view engine setup
app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

require('./routes/index')(app, passport)

app.listen(port, () => console.log(`Server is running on port ${port}`))
