'use strict'

const { getQueryData } = require('@envage/hapi-govuk-journey-map')

module.exports = {
  method: 'GET',
  handler: async (request, h) => {
    const { likeMyExample: answer, likeMyExampleComment: comment } = await getQueryData(request)
    const commentDetail = comment ? `<br>with the following comment:<br>"${comment}"` : ''
    return h.view('completed', {
      pageHeading: 'Example complete',
      details: `You chose<br><strong>${answer}</strong>${commentDetail}`
    })
  }
}
