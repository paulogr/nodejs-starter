function issueWebDetails ({ integrations, utils }) {
  return {
    routes: [
      {
        url: '/:id',
        method: 'GET',
        async handler (req, reply) {
          const id = utils.id.decode(req.params.id)

          if (!id) {
            return reply.callNotFound()
          }

          const card = await integrations.pipefy.getCardById(id)

          if (!card) {
            return reply.callNotFound()
          }

          return reply.view('modules/issues/web/details', { card })
        }
      }
    ]
  }
}

module.exports = issueWebDetails