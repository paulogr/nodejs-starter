function api({ utils, issuesApiWebhookApiPipefy }) {
  return async function (server, _) {
    server.register(async function (server, _) {
      server.register(async function (server, _) {
        utils.fastify.registerRoutes(server, issuesApiWebhookApiPipefy)
      }, { prefix: '/webhooks' })
    }, { prefix: '/issues' })
  }
}

module.exports = api