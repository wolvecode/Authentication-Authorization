const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
// const { signup, login } = require('../controller/signContrller')

//handle middleware from middleware-authenticationZ
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    })
  }
)

//Handle login middleware from middleware-auth
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error)
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error)
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, 'top_secret')
        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

router.get('/', (req, res) => {
  res.json({ message: 'try' })
})
router.post('/', (req, res) => {
  res.json('Hello world')
})
// router.post('/signup', signup)
// router.post('/login', login)

module.exports = router
