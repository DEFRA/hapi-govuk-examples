'use strict'

const { getQueryData } = require('@envage/hapi-govuk-journey-map')

module.exports = {
  method: 'GET',
  handler: async (request, h) => {
    const { answer } = await getQueryData(request)
    return h.view('completed', {
      pageHeading: 'Example complete',
      details: `You chose<br><strong>${answer}</strong>`
    })
  }
}
