const awilix = require('awilix')
const glob = require('fast-glob')

const config = require('./config')
const logger = require('./infrastructure/logger')
const integrations = require('./integrations')
const worker = require('./infrastructure/worker')
const utils = require('./utils')
const email = require('./infrastructure/email')
const webserver = require('./infrastructure/webserver')

const container = awilix.createContainer()

container.register({
  config: awilix.asFunction(config, { lifetime: awilix.Lifetime.SINGLETON }),
  logger: awilix.asFunction(logger, { lifetime: awilix.Lifetime.SINGLETON }),
  integrations: awilix.asFunction(integrations, { lifetime: awilix.Lifetime.SINGLETON }),
  worker: awilix.asFunction(worker, { lifetime: awilix.Lifetime.SINGLETON }),
  utils: awilix.asFunction(utils, { lifetime: awilix.Lifetime.SINGLETON }),
  email: awilix.asFunction(email, { lifetime: awilix.Lifetime.SINGLETON }),
  webserver: awilix.asFunction(webserver, { lifetime: awilix.Lifetime.SINGLETON })
})

loadModules(
  [
    'modules/**/api/**/*.js',
    'modules/**/emails/*.js',
    ['modules/**/jobs/*.js', { lazy: false }],
    'modules/**/web/*.js'
  ],
  {
    register: awilix.asFunction,
    lifetime: awilix.Lifetime.SINGLETON,
  }
)

function loadModules(patterns, defaultOptions) {
  defaultOptions = Object.assign({
    register: awilix.asFunction,
    lifetime: awilix.Lifetime.SINGLETON,
    lazy: true 
  }, defaultOptions)
  
  for (let i = 0; i < patterns.length; i++) {
    if (typeof patterns[i] === 'string') {
      patterns[i] = [patterns[i], defaultOptions]
    } else if (Array.isArray(patterns[i])) {
      patterns[i] = [patterns[i][0], Object.assign(defaultOptions, patterns[i][1])]
    }

    const [pattern, options] = patterns[i]
    
    const paths = glob.sync(pattern, { absolute: true })

    for (let x = 0; x < paths.length; x++) {
      const loadedModule = require(paths[x])
      
      container.register(
        loadedModule.name,
        options.register(loadedModule).setLifetime(options.lifetime)
      )

      if (options.lazy === false) {
        container.resolve(loadedModule.name)
      }
    }
  }
}

module.exports = container