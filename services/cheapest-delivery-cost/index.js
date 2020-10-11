const { calculateCheapestDeliveryCost } = require('./cheapest-delivery-cost')
const Joi = require('joi')

module.exports = {
  path: '/cheapest-delivery-cost',
  requestSchema: Joi.object().keys({
    graphtext: Joi.string().required().example('AB1, BC2'),
    source: Joi.string().required().max(1).uppercase(),
    destination: Joi.string().required().max(1).uppercase(),
  }),
  handler: (payload) => {
    const { graphtext, source, destination } = payload
    const cost = calculateCheapestDeliveryCost(
      graphtext,
      `${source}-${destination}`,
    )
    return {
      cost,
    }
  },
}
