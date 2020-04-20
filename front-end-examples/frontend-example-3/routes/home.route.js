'use strict'

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => h.view('hello-world', {
    pageHeading: 'Hello World!',
    pageText: 'Here is my first GDS styled page'
  })
}
