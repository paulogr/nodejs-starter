const pipefy = require('./pipefy')

function integrations (deps) {
  return {
    pipefy: pipefy(deps)
  }
}

module.exports = integrations