const { calculateCheapestDeliveryCost } = require('./cheapest-delivery-cost')
const { graphSchema } = require('../../lib/api')
const Joi = require('joi')

module.exports = {
  path: '/cheapest-delivery-cost',
  requestSchema: Joi.object().keys({
    graph: graphSchema.required(),
    source: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
    destination: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  }),
  handler: (payload) => {
    const { graph, source, destination } = payload
    const cost = calculateCheapestDeliveryCost(
      graph.join(', '),
      `${source}-${destination}`,
    )
    return {
      cost,
    }
  },
}
