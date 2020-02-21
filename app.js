const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 8000

const app = express()

app.listen(port, () => {
  console.log(`server lsitening at port ${port}`)
})

nextApp.prepare().then(() => {
  const app = express()

  app.get('/my-custom-route', (req, res) =>
    res.status(200).json({ hello: 'Hello, from the back-end world!' })
  )

  app.get('/', (req, res) => {
    res.send('Hello world')
  })
})
