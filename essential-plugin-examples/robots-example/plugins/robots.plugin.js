'use strict'

module.exports = {
  plugin: require('hapi-robots'),
  options: {
    // will disallow everyone from every path:
    '*': ['/']
  }
}
