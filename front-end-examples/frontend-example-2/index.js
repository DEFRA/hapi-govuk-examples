'use strict'

const Hapi = require('@hapi/hapi')
const pkg = require('./package.json')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register({
    plugin: require('@envage/hapi-govuk-frontend'),
    options: {
      assetPath: '/assets',
      assetDirectories: ['public/static', 'public/build'],
      serviceName: 'My Generic Government Service',
      viewPath: 'views',
      includePaths: [],
      context: {
        appVersion: pkg.version
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('hello-world', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GOV.UK Design System styled page'
    })
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
