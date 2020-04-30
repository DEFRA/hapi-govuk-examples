'use strict'

const { getQueryData } = require('@envage/hapi-govuk-journey-map')

module.exports = {
  method: 'GET',
  handler: async (request, h) => {
    const { likeMyExample: answer, likeMyExampleComment: comment, satisfactionScore } = await getQueryData(request)
    const commentDetail = comment ? `<br>and the following comment:<br><strong>"${comment}"</strong>` : ''
    return h.view('completed', {
      pageHeading: 'Example complete',
      details: `You chose<br><strong>${answer}</strong><br>with a satisfaction score of <strong>${satisfactionScore}</strong> ${commentDetail}`
    })
  }
}
