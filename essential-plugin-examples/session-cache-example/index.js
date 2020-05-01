'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    cache: {
      provider: {
        constructor: require('@hapi/catbox-redis'),
        options: {
          partition: 'hapi-cache',
          port: process.env.REDIS_PORT,
          host: process.env.REDIS_HOST
        }
      }
    }
  })

  await server.register(require('./plugins/session-cache.plugin'))
  await server.register(require('./plugins/frontend.plugin'))
  await server.register(require('./plugins/journey-map.plugin'))
  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
