const localstrategy = require('passport-local').Strategy
const passport = require('passport')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../model/User')

//Create a middlewate to handle the registration
passport.use(
  'signup',
  new localstrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password })
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

//Create a middleware for login
passport.use(
  'login',
  new localstrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        //Find the user associated with the email provided by the user
        const user = await User.findOne({ email })
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found' })
        }
        //validate if the password entered by the user is equivalent to the password in the database 
        const validate = await user.isValidPassword(password)
        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }
        //Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: 'top_secret',
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)
