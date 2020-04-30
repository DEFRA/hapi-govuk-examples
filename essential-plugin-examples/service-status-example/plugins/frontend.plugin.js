'use strict'

const pkg = require('../package.json')

module.exports = {
  plugin: require('@envage/hapi-govuk-frontend'),
  options: {
    assetPath: '/assets',
    assetDirectories: ['public/static', 'public/build'],
    serviceName: 'My Generic Government Service',
    viewPath: 'modules',
    includePaths: [],
    context: {
      appVersion: pkg.version
    }
  }
}
