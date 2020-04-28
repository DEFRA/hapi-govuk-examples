'use strict'

const { setQueryData, getQueryData, getCurrent } = require('@envage/hapi-govuk-journey-map')

function getOptions (request) {
  const route = getCurrent(request)
  const { options } = route.parent
  return options
}

module.exports = [{
  method: 'GET',
  handler: (request, h) => {
    const { commentHeading, commentProperty } = getOptions(request)
    const queryData = getQueryData(request)
    return h.view('question/comment', {
      pageHeading: commentHeading,
      comment: queryData[commentProperty]
    })
  }
}, {
  method: 'POST',
  handler: async (request, h) => {
    const { commentProperty } = getOptions(request)
    const { comment } = request.payload
    setQueryData(request, { [commentProperty]: comment })
    return h.continue
  }
}]
