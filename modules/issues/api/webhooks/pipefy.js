function issuesApiWebhookApiPipefy ({ integrations, logger, worker }) {
  return {
    routes: [
      {
        url: '/',
        method: 'POST',
        async handler (req, reply) {
          const { data: { action, card }} = req.body

          const id = await worker.send(`issues:${action}`, { card })
          logger.info(`pipefy webhook received [job id]: ${id}`)

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