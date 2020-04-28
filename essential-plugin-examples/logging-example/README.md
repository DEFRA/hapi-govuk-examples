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
