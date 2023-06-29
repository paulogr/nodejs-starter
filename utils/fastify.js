function fastify ({ config }) {
  function registerRoutes(server, { routes, hooks, prefix }) {
    server.register(async function (server, _) {
      routes?.forEach(r => server.route(r))
      hooks?.forEach(h => server.addHook(h.name, h.handler))
    }, { prefix })
  }
  

  return {
    registerRoutes
  }
}

module.exports = fastify