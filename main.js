const container = require('./container')

async function main () {
  const webserver = container.resolve('webserver')
  const worker = container.resolve('worker')
  const logger = container.resolve('logger')


  try {
    await webserver.start()
    await worker.start()
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

main()
