'use strict'

const Joi = require('@hapi/joi')
const { failWith } = require('../../utils/validation')
const { setQueryData, getQueryData, getCurrent } = require('@envage/hapi-govuk-journey-map')
const view = 'question/question'

function getOptions (request) {
  const route = getCurrent(request)
  const { options } = route.parent
  return options
}

function getPageHeading (request) {
  const { questionHeading } = getOptions(request)
  return questionHeading
}

function getHint (request) {
  const { hint } = getOptions(request)
  return { text: hint }
}

function getItems (request) {
  const { items, answerProperty } = getOptions(request)
  const queryData = getQueryData(request)
  return items.map(({ value, text, hint }) => {
    return {
      value,
      text,
      hint: { text: hint },
      checked: queryData[answerProperty] === String(value)
    }
  })
}

module.exports = [{
  method: 'GET',
  handler: (request, h) => {
    return h.view(view, {
      pageHeading: getPageHeading(request),
      hint: getHint(request),
      items: getItems(request)
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
  },
  options: {
    validate: {
      payload: Joi.object({
        answer: Joi.string().trim().required()
      }),
      failAction: failWith(view,
        { pageHeading: getPageHeading, hint: getHint, items: getItems }, {
          answer: {
            'any.required': 'Select an option'
          }
        })
    }
  }
}]
