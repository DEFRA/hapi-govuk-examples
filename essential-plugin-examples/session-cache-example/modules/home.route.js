'use strict'

const Cache = require('../utils/cache')

module.exports = [{
  method: 'GET',
  handler: (request, h) => {
    // Visiting the home page will clear all the session cache
    Cache.reset(request)

    return h.view('home', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GOV.UK Design System styled page'
    })
  }
}, {
  method: 'POST',
  handler: (request, h) => h.continue
}]
