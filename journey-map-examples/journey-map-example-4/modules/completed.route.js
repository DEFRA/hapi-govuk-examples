'use strict'

const { getQueryData } = require('@envage/hapi-govuk-journey-map')
const path = '/completed'

module.exports = {
  method: 'GET',
  path,
  handler: async (request, h) => {
    const { answer } = await getQueryData(request)
    return h.view('completed', {
      pageHeading: 'Example complete',
      details: `You chose<br><strong>${answer}</strong>`
    })
  }
}
