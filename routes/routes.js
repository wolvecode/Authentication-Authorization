const express = require('express')
const router = express.Router()
const { signup, signin } = require('../controller/signContrller')

//register a user
router.post('/signup', signup)
//login a user
router.post('/login', signin)

router.get('/', (req, res, next) => {
  res.json('Hello world')
})

module.exports = router
