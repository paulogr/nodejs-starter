const email = require('./email')
const fastify = require('./fastify')
const id = require('./id')

function utils (deps) {
  return {
    email: email(deps),
    fastify: fastify(deps),
    id: id(deps)
  }
}

module.exports = utils