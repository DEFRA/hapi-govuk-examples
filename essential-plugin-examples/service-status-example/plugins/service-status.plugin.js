module.exports = {
  plugin: require('hapi-version-status'),
  options: {
    path: '/service-status',
    view: 'service-status',
    viewData: {
      pageHeading: 'Service status and versions'
    }
  }
}
