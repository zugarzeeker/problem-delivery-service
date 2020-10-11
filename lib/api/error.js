const createError = (code, type, description) => {
  const e = new Error(description)
  e.code = code
  e.type = type
  e.description = description
  return e
}

const validation = (description) =>
  createError(400, 'invalid_payload', description)

const uncaught = (e = {}) =>
  createError(
    e.code || 500,
    e.type || 'uncaught_error',
    e.message || e.description || 'Uncaught error',
  )

module.exports = {
  validation,
  uncaught,
}
module.exports.validation = validation
module.exports.uncaught = uncaught
