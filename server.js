const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { createServices } = require('./services')
const app = express()

const DEFAULT_PORT = 6000
const PORT = process.env.PORT || DEFAULT_PORT

// app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send({ message: 'ok' })
})

createServices(app)

app.listen(PORT, () => {
  console.log(`service start at ${PORT}`)
})
