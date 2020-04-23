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
    const { questionHeading, answerProperty, hint, items } = getOptions(request)
    const queryData = getQueryData(request)
    return h.view('question/question', {
      pageHeading: questionHeading,
      hint: { text: hint },
      items: items.map(({ value, text, hint }) => {
        return {
          value,
          text,
          hint: { text: hint },
          checked: queryData[answerProperty] === value
        }
      })
    })
  }
}, {
  method: 'POST',
  handler: async (request, h) => {
    const { answerProperty, commentProperty } = getOptions(request)
    const queryData = getQueryData(request)
    const { answer } = request.payload
    const commentRequired = commentProperty && answer !== 'yes'
    await setQueryData(request, {
      answer,
      commentRequired: commentRequired ? 'yes' : 'no',
      [commentProperty]: commentRequired ? queryData[commentProperty] : undefined,
      [answerProperty]: answer
    })
    return h.continue
  }
}]
