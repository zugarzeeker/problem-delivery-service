const { countPossibleRoutes } = require('./count-possible-routes')
const { graphSchema } = require('../../lib/api')
const Joi = require('joi')

const requestSchemaA = Joi.object().keys({
  graph: graphSchema.required(),
  source: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  destination: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  limitStops: Joi.number().required().positive(),
  sameRouteEnable: Joi.boolean().required(),
})
const requestSchemaB = Joi.object().keys({
  graph: graphSchema.required(),
  source: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  destination: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  limitDistance: Joi.number().required().positive(),
  sameRouteEnable: Joi.boolean().required(),
})
// TODO: not sure this case (should test more)
const requestSchemaC = Joi.object().keys({
  graph: graphSchema.required(),
  source: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  destination: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  limitStops: Joi.number().required().positive(),
  limitDistance: Joi.number().required().positive(),
  sameRouteEnable: Joi.boolean().required(),
})
const requestSchemaD = Joi.object().keys({
  graph: graphSchema.required(),
  source: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  destination: Joi.string().required().max(1).pattern(new RegExp('[A-Z]')),
  sameRouteEnable: Joi.boolean().required().valid(false),
})
module.exports = {
  path: '/count-possible-routes',
  requestSchema: Joi.alternatives().try(
    requestSchemaA,
    requestSchemaB,
    requestSchemaC,
    requestSchemaD,
  ),
  handler: (payload) => {
    const {
      graph,
      source,
      destination,
      limitStops,
      limitDistance,
      sameRouteEnable,
    } = payload
    const count = countPossibleRoutes(
      graph.join(', '),
      `${source}-${destination}`,
      {
        limitStops,
        limitDistance,
        sameRouteEnable,
      },
    )
    return {
      count,
    }
  },
}
