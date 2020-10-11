const { sum } = require('./example-sum')
const Joi = require('joi')

module.exports = {
  path: '/example-sum',
  requestSchema: Joi.object().keys({
    a: Joi.number().required(),
    b: Joi.number().required(),
  }),
  handler: (payload) => {
    const { a, b } = payload
    return {
      result: sum(a, b),
    }
  },
}
