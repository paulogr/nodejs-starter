const pino = require('pino')

function logger ({ config }) {
  return pino(config.logger)
}

module.exports = logger