const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(() => {
  const app = express()

  app.get('/my-custom-route', (req, res) => {
    res.status(200).json({ hello: 'Hello from wolvcode' })
  })

  app.get('*', (req, res) => {
    if (err) throw err
    console.log(`> Ready on localhost: ${port}`)
  })
})
