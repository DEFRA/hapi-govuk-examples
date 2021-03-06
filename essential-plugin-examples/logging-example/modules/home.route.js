'use strict'

const { logger } = require('defra-logging-facade')

module.exports = [{
  method: 'GET',
  handler: (request, h) => {
    logger.info('******* You have just loaded the home page! *******')

    return h.view('home', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GOV.UK Design System styled page'
    })
  }
}, {
  method: 'POST',
  handler: (request, h) => h.continue
}]
