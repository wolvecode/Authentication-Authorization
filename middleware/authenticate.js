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
        //find one email if exist
        const user = await User.findOne({ email })
        if (!user) {
          done(null, false, { message: 'User not found' })
        }
        const validate = await user.isValidPassword({ password })
        if (!validate) {
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user, { message: 'Logged in succesful' })
      } catch (err) {
        return done(err)
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
