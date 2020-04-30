'use strict'

module.exports = [{
  method: 'GET',
  handler: async (request, h) => {
    return h.view('apology', {
      pageHeading: 'Apology',
      pageText: 'I\'m sorry you don\'t like my example'
    })
  }
}, {
  method: 'POST',
  handler: (request, h) => h.continue
}]
