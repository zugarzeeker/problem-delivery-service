const { calculateDeliveryCost } = require('./delivery-cost')
const Joi = require('joi')

module.exports = {
  path: '/delivery-cost',
  requestSchema: Joi.object().keys({
    graphtext: Joi.string().required().example('AB1, BC2'),
    deliveryRoute: Joi.array().items(Joi.string().required()).min(2).required(),
  }),
  handler: (payload) => {
    const { graphtext, deliveryRoute } = payload
    const cost = calculateDeliveryCost(graphtext, deliveryRoute.join('-'))
    return {
      cost,
    }
  },
}
