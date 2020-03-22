const localstrategy = require('passport-local').Strategy
const passport = require('passport')
const userModel = require('../model/User')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJWT

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
        const user = new userModel({
          email: require.body.email,
          password: require.body.password
        })
        return done(null, user)
      } catch (err) {
        return done(err)
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
        const user = await userModel.findOne({ email })
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


//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey : 'top_secret',
  //Users are exprected to send in token as part of parameter
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));