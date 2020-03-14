const mongoose = require('mongoose')

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' })
}

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}

exports.validateRegister = function(req, res, next) {
  req.sanitizeBody('name')
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('email', 'Email supply is not valid').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extenstion: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password can not blank').notEmpty()
  req
    .checkBody('password-confirm', 'Oops! Your password do not match')
    .equals(req.body.password)

  const errors = req.validationErrors()
  if (errors) {
    req.flash(
      'error',
      errors.map(err => err.msg)
    )
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    })
    return
  }
  next()
}


exports.register = async (req, res , next) => {
  
}