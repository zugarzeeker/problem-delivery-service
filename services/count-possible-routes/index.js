const { countPossibleRoutes } = require('./count-possible-routes')
const Joi = require('joi')

const requestSchemaA = Joi.object().keys({
  graphtext: Joi.string().required().example('AB1, BC2'),
  source: Joi.string().required().max(1).uppercase(),
  destination: Joi.string().required().max(1).uppercase(),
  limitStops: Joi.number().required().positive(),
  sameRouteEnable: Joi.boolean().required(),
})
const requestSchemaB = Joi.object().keys({
  graphtext: Joi.string().required().example('AB1, BC2'),
  source: Joi.string().required().max(1).uppercase(),
  destination: Joi.string().required().max(1).uppercase(),
  limitDistance: Joi.number().required().positive(),
  sameRouteEnable: Joi.boolean().required(),
})
// TODO: not sure this case (should test more)
const requestSchemaC = Joi.object().keys({
  graphtext: Joi.string().required().example('AB1, BC2'),
  source: Joi.string().required().max(1).uppercase(),
  destination: Joi.string().required().max(1).uppercase(),
  limitStops: Joi.number().required().positive(),
  limitDistance: Joi.number().required().positive(),
  sameRouteEnable: Joi.boolean().required(),
})
const requestSchemaD = Joi.object().keys({
  graphtext: Joi.string().required().example('AB1, BC2'),
  source: Joi.string().required().max(1).uppercase(),
  destination: Joi.string().required().max(1).uppercase(),
  sameRouteEnable: Joi.boolean().required().valid(false),
})
const requestSchemaBonus = Joi.object().keys({
  graphtext: Joi.string().required().example('AB1, BC2'),
  source: Joi.string().required().max(1).uppercase(),
  destination: Joi.string().required().max(1).uppercase(),
  sameRouteEnable: Joi.boolean().required().valid(true),
})
module.exports = {
  path: '/count-possible-routes',
  requestSchema: Joi.alternatives().try(
    requestSchemaA,
    requestSchemaB,
    requestSchemaC,
    requestSchemaD,
    requestSchemaBonus,
  ),
  handler: (payload) => {
    const {
      graphtext,
      source,
      destination,
      limitStops,
      limitDistance,
      sameRouteEnable,
    } = payload
    const count = countPossibleRoutes(graphtext, `${source}-${destination}`, {
      limitStops,
      limitDistance,
      sameRouteEnable,
    })
    return {
      count,
    }
  },
}
