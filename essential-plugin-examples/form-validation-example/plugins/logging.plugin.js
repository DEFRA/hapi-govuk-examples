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
