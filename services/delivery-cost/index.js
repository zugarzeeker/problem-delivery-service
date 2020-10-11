const { graphSchema } = require('../../lib/api')
const { calculateDeliveryCost } = require('./delivery-cost')
const Joi = require('joi')

module.exports = {
  path: '/delivery-cost',
  requestSchema: Joi.object().keys({
    graph: graphSchema.required(),
    deliveryRoute: Joi.array()
      .items(Joi.string().max(1).pattern(new RegExp('[A-Z]')).required())
      .min(2)
      .required(),
  }),
  handler: (payload) => {
    const { graph, deliveryRoute } = payload
    const cost = calculateDeliveryCost(
      graph.join(', '),
      deliveryRoute.join('-'),
    )
    return {
      cost,
    }
  },
}
