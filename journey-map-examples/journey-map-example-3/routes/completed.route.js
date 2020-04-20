'use strict'

const path = '/completed'

module.exports = {
  method: 'GET',
  path,
  handler: (request, h) => {
    const { answer } = request.query
    return h.view('completed', {
      pageHeading: 'Example complete',
      details: `You chose<br><strong>${answer}</strong>`
    })
  }
}
