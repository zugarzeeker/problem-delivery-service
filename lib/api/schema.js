const Joi = require('joi')

const graphSchema = Joi.array()
  .items(
    Joi.string().pattern(new RegExp('[A-Z][A-Z]([1-9]([0-9]*))')).required(),
  )
  .required()

module.exports.graphSchema = graphSchema
