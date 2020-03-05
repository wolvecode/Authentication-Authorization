const LocalStrategy = require('passport-local').Strategy

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.send('Go to http://localhost:8000/login to login')
  })

  app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard')
  })

  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
  })

  app.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/dashboard'
    })
  )

  passport.use(
    new LocalStrategy((username, password, done) => {
      if (username === 'biodun@gmail.com' && password === '1234') {
        return done(null, { username: 'biodun@gmail.com' })
      } else {
        return done(null, false)
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.username)
  })

  passport.deserializeUser((username, done) => {
    done(null, { username: username })
  })

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      return res.redirect('/login')
    }
  }
}
