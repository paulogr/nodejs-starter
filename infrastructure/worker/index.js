const Pgboss = require('pg-boss')

function worker ({ config, logger }) {
  const client = new Pgboss(config.database.url)
  
  client.on('error', err => logger.error(err))

  async function start () {
    await client.start()
    logger.info('Worker successfully running')
  }

  return {
    start,
    send: client.send.bind(this),
    work: client.work.bind(this)
  }
}

module.exports = worker