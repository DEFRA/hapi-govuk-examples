const cache = {}

const { resolve } = require('path')

module.exports = {
  plugin: require('@envage/hapi-govuk-journey-map'),
  options: {
    modulePath: resolve(`${process.cwd()}/modules`),
    setQueryData: (request, data) => {
      Object.assign(cache, data)
    },
    getQueryData: (request) => {
      return { ...cache }
    },
    journeyMapPath: '/journey-map'
  }
}
