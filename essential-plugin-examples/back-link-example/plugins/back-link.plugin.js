module.exports = {
  plugin: {
    name: 'back-link',
    register: (server) => {
      server.ext('onPostHandler', (request, h) => {
        if (request.response.variety === 'view') {
          const { tags = [] } = request.route.settings
          // include the back link unless explicitly told not to
          request.response.source.context.includeBacklink = !tags.includes('hide-back-link')
        }
        return h.continue
      })
    }
  }
}
