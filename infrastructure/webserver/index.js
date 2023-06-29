const fastify = require('fastify')

function webserver (deps) {
  const { config } = deps

  const web = require('./web')(deps)
  const api = require('./api')(deps)

  const server = fastify({ trustProxy: 2, logger: config.logger })
  
  server.register(web, { prefix: '/' })
  server.register(api, { prefix: '/api' })

  function start() {
    return server.listen({ port: config.server.port })
  }

  return {
    start
  }
}

module.exports = webserver