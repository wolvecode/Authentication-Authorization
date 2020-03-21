const localstrategy = require('passport-local').Strategy
const passport = require('passport')
const userModel = require('../model/User')

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
      passwordField: password
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
