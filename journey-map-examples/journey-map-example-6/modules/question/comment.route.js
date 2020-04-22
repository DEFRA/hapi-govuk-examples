'use strict'

const { setQueryData, getQueryData } = require('@envage/hapi-govuk-journey-map')

module.exports = [{
  method: 'GET',
  handler: (request, h) => {
    const { comment } = getQueryData(request)
    return h.view('question/comment', {
      pageHeading: 'Please leave a comment',
      comment: comment
    })
  }
}, {
  method: 'POST',
  handler: async (request, h) => {
    const { comment } = request.payload
    await setQueryData(request, { comment })
    return h.continue
  }
}]
