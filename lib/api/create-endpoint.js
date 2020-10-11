const Joi = require('joi')
const { join } = require('path')
const Errors = require('./error')

const createEndpoint = (app) => ({ path, requestSchema, handler } = {}) => {
  app.post(join('/', path), async (req, res) => {
    const respondError = (e) => res.status(e.code).send(e)
    const respondResult = (result) => res.status(200).send(result)
    try {
      // validation
      if (!Joi.isSchema(requestSchema)) {
        respondError(
          Errros.uncaught({
            message: 'Invalid Request Schema Validator [Internal]',
          }),
        )
        return
      }
      const validationResult = requestSchema.validate(req.body, {
        stripUnknown: true,
      })
      if (validationResult.error) {
        console.error(validationResult.error.details[0].message)
        respondError(
          Errors.validation(validationResult.error.details[0].message),
        )
        return
      }
      const result = await handler(validationResult.value)
      respondResult(result)
    } catch (e) {
      console.error(e)
      respondError(Errors.uncaught(e))
    }
  })
}

module.exports.createEndpoint = createEndpoint
