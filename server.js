const app = require('./app')

//Starting server at port 5000
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}...`))
