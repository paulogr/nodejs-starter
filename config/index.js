const { S } = require('fluent-json-schema')
const envSchema = require('env-schema')

function config () {
  const env = envSchema({
    dotenv: true,
    schema: S.object()
      .prop('NODE_ENV', S.string().default('development'))
      .prop('PORT', S.number().default(5000))
      .prop('LOG_LEVEL', S.string().enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'))
      .prop('DATABASE_URL', S.string().required())
      .prop('SECRET', S.string().required())
      .prop('PIPEFY_API_KEY', S.string().required())
      .prop('PIPEFY_API_ENDPOINT', S.string().required())
      .prop('EMAIL_FROM', S.string().required())
      .prop('STATIC_HOST', S.string().required())
      .prop('API_HOST', S.string().required())
      .prop('SMTP_HOST', S.string().required())
      .prop('SMTP_PORT', S.string().required())
      .prop('SMTP_USERNAME', S.string().required())
      .prop('SMTP_PASSWORD', S.string().required())
  })

  const isProduction = /^\s*prod\s*$/i.test(env.NODE_ENV)

  return {
    isProduction,
    server: {
      port: env.PORT
    },
    logger: {
      level: env.LOG_LEVEL
    },
    database: {
      url: env.DATABASE_URL
    },
    secret: env.SECRET,
    integrations: {
      pipefy: {
        endpoint: env.PIPEFY_API_ENDPOINT,
        apiKey: env.PIPEFY_API_KEY
      }
    },
    email: {
      from: env.EMAIL_FROM,
      smtp: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        username: env.SMTP_USERNAME,
        password: env.SMTP_PASSWORD
      }
    },
    api: {
      host: env.API_HOST
    },
    static: {
      host: env.STATIC_HOST
    }
  }
}

module.exports = config