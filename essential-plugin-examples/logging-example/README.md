# Logging example

Logging is a requirement for any DEFRA service.

The following example will build on the [front end examples](../../front-end-examples/README.md) and make use of the [defra-logging-facade](https://github.com/DEFRA/defra-logging-facade) plugin to provide a simple way to configure the logging in a hapi server.

### Install the plugin along with required peer dependencies
Use npm install
```console
foo@bar:~$ npm install https://github.com/DEFRA/defra-logging-facade.git 
foo@bar:~$ npm install @hapi/good @hapi/good-squeeze 
```

Create the new plugin plugins/logging.plugin.js
```js
module.exports = {
  plugin: require('@hapi/good'),
  options: {
    ops: {
      interval: 60000
    },
    reporters: {
      console: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{
            log: '*',
            error: '*',
            response: { exclude: 'asset' },
            request: '*',
            ops: '*'
          }]
        }, {
          module: 'defra-logging-facade',
          args: [{
            goodEventLevels: {
              log: 'info',
              error: 'error',
              ops: 'debug',
              request: 'info',
              response: 'info'
            }
          }]
        }
      ]
    }
  }
}
```

Edit the index.js file to register the logging plugin and add some logging 
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/logging.plugin'))
  await server.register(require('./plugins/frontend.plugin'))
  await server.route(require('./routes/home.route'))
  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
```

Add a logging message of type info to the route routes/home.route.js
```js
'use strict'

const { logger } = require('defra-logging-facade')

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    logger.info('******* You have just loaded the home page! *******')

    return h.view('home', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GOV.UK Design System styled page'
    })
  }
}
```

Make sure all the javascript files are formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

### Make sure the application now works as expected

Now start the server
```console
foo@bar:~$ npm start
```

Every request made should now be reported within the log and console as well as the specified home page message. See the terminal output below:
```console
> frontend-example@1.0.0 start /logging-example
> node index.js

Server running on http://localhost:3000
info: ******* You have just loaded the home page! *******
info:  (1588174221935:bar:9825:k9lhx6ke:10000) [response] http://localhost:3000: get / [Object: null prototype] {} 200 (163ms)
info:  (1588174222180:bar:9825:k9lhx6ke:10002) [response] http://localhost:3000: get /assets/all.js [Object: null prototype] {} 304 (25ms)
info:  (1588174222175:bar:9825:k9lhx6ke:10001) [response] http://localhost:3000: get /assets/stylesheets/application.css [Object: null prototype] {} 304 (33ms)
info:  (1588174222294:bar:9825:k9lhx6ke:10003) [response] http://localhost:3000: get /assets/images/govuk-crest.png [Object: null prototype] {} 304 (21ms)
info:  (1588174222296:bar:9825:k9lhx6ke:10004) [response] http://localhost:3000: get /assets/fonts/light-94a07e06a1-v2.woff2 [Object: null prototype] {} 304 (34ms)
info:  (1588174222303:bar:9825:k9lhx6ke:10005) [response] http://localhost:3000: get /assets/fonts/bold-b542beb274-v2.woff2 [Object: null prototype] {} 304 (57ms)
```

### Completed logging example
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Other essential plugins
Continue with the [other essential plugins](../README.md)
