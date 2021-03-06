const { createEndpoint } = require('../lib/api')
const createServices = (app) => {
  app.get('/health', (req, res) => {
    res.status(200).send({ message: 'ok' })
  })
  const modules = [
    // TODO: add module here | or dynamic 'require()' and generated automatically
    require('./example-sum'),
    require('./delivery-cost'),
    require('./cheapest-delivery-cost'),
    require('./count-possible-routes'),
  ]
  modules.map(createEndpoint(app))
}

module.exports.createServices = createServices
