# Journey map example part 2
Please note that this continues with the project built within [part 1](../journey-map-example-1/README.md)

## Add the question page 
The question page will give a choice of Yes or No using the [Radios component](https://design-system.service.gov.uk/components/radios/).

Create the views/question.njk file with the following:
```twig
{% extends "layout.njk" %}

{% from "govuk/components/radios/macro.njk" import govukRadios %}
{% from "govuk/components/button/macro.njk" import govukButton %}

{% block content %}
    <form method="post" autocomplete="off" novalidate>
        {{ govukRadios({
            idPrefix: "answer",
            name: "answer",
            fieldset: {
                legend: {
                    text: pageHeading,
                    isPageHeading: true,
                    classes: "govuk-fieldset__legend--l"
                }
            },
            hint: hint,
            items: items
        }) }}

        {{ govukButton({
            text: "Continue"
        }) }}
    </form>
{% endblock %}
```

Create the routes/question.route.js file with the following content:
```js
'use strict'

const path = '/question'

module.exports = [{
  method: 'GET',
  path,
  handler: (request, h) => h.view('question', {
    pageHeading: 'Are you enjoying these examples so far?',
    hint: { text: 'If I\'ve done my job correctly, they should be easy to follow' },
    items: [
      {
        value: 'yes',
        text: 'Yes',
        hint: { text: 'They\'re great' }
      },
      {
        value: 'no',
        text: 'No',
        hint: { text: 'Not really' }
      }
    ]
  })
}, {
  method: 'POST',
  path,
  handler: (request, h) => {
    const { answer } = request.payload
    return h.redirect(`/completed?answer=${answer}`)
  }
}]
```

Register the question route in the index.js file
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/frontend.plugin'))
  await server.route(require('./routes/home.route'))
  await server.route(require('./routes/question.route'))
  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
``` 

Make sure all the javascript files are formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

### Make sure the application now works as expected

Now start the server
```console
foo@bar:~$ npm start
```

The browser should display the following web page with the continue button

![alt text](../screen-shots/home.png "home page")

Pressing the continue button should display the question page with two radio buttons and a continue button

![alt text](../screen-shots/question.png "question page")

When "Yes" is selected and continue is clicked, the expected error status for the /completed page route is displayed as we haven't created it yet

![alt text](https://raw.githubusercontent.com/DEFRA/hapi-govuk-examples/master/journey-map-examples/screen-shots/completed(404).png "completed page missing")

### Completed journey-map-example part 2
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Journey map example part 3
Continue with [part 3](../journey-map-example-3/README.md)