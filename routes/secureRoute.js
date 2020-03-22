const express = require('express')
const router = express.Router()
//Secure route

router.get('/profile', (req, res) => {
  res.json({
    message: 'you made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
})

module.exports = router
