function issuesApiWebhookApiPipefy ({ integrations, logger, worker }) {
  return {
    routes: [
      {
        url: '/',
        method: 'POST',
        async handler (req, reply) {
          const { data: { action, card }} = req.body

          const id = await worker.send(`issues:pipefy`, { action, card })
          logger.info(`[${id}]: pipefy ${action} webhook received`)

          return { ok: true }
        }
      }
    ],
    hooks: [
      {
        name: 'preValidation',
        async handler (req, reply) {}
      }
    ],
    prefix: '/pipefy'
  }
}

module.exports = issuesApiWebhookApiPipefy