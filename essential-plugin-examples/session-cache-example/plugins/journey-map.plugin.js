const { resolve } = require('path')
const Cache = require('../utils/cache')

const QueryData = new Cache('QueryData')

module.exports = {
  plugin: require('@envage/hapi-govuk-journey-map'),
  options: {
    modulePath: resolve(`${process.cwd()}/modules`),
    getQueryData: (request) => QueryData.get(request),
    setQueryData: (request, data) => QueryData.set(request, data),
    journeyMapPath: '/journey-map'
  }
}
