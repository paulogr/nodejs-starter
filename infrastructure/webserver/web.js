const static = require('@fastify/static')
const view = require('@fastify/view')
const nunjucks = require('nunjucks')
const path = require('node:path')

function web ({ utils, issueWebDetails, config, logger }) {
  return async function (server, _) {
    server.register(static, {
      root: path.join(process.cwd(), 'public'),
      prefix: '/public/'
    })

    server.register(view, {
      engine: {
        nunjucks
      },
      defaultContext: {
        config
      },
      options: {
        onConfigure: (env) => {
          env.addFilter('encodeId', function (id) {
            return utils.id.encode(id)
          })
        
          env.addFilter('decodeId', function (hash) {
            return utils.id.decode(hash)
          })
        }
      }
    })

    server.setNotFoundHandler(async function (req, reply) {
      return reply.view('templates/404')
    })

    server.setErrorHandler(async function (err, req, reply) {
      logger.error(err)
      return reply.view('templates/500')
    })

    server.register(async function (server, _) {
      utils.fastify.registerRoutes(server, issueWebDetails)      
    }, { prefix: '/issues' })
  }
}

module.exports = web