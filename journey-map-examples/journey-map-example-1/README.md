# Journey map example part 1
Please note that this relies on completing all the parts of the [frontend example](../../front-end-examples/README.md)

### Make the home page a form with a continue button
The continue button will make use of the [Button component](https://design-system.service.gov.uk/components/button/)
A form layout that extends from the layout will be used so that all form based views can reuse the form markup.

Create a new layout as views/form-layout.njk that contains the following:
```twig
{% extends "layout.njk" %}

{% from "govuk/components/button/macro.njk" import govukButton %}

{% block formContent %}
    <form method="post" autocomplete="off" novalidate>
        {% block formContent %}
        {% endblock %}

        {{ govukButton({
            text: "Continue"
        }) }}
    </form>
{% endblock %}
```

Edit views/home.njk so that it extends from the form layout and uses the formContent block:
```twig
{% extends "form-layout.njk" %}
 
{% block formContent %}
    <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
    <p class="govuk-body">{{ pageText }}</p>
{% endblock %}
```

Edit routes/home.route.js so that a post method will redirect to the question page
```js
'use strict'

const path = '/'

module.exports = [{
  method: 'GET',
  path,
  handler: (request, h) => h.view('home', {
    pageHeading: 'Hello World!',
    pageText: 'Here is my first GOV.UK Design System styled page'
  })
}, {
  method: 'POST',
  path,
  handler: (request, h) => h.redirect('/question')
}]
```

Make sure home.route.js is formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

### Make sure the application now works as expected

Now start the server
```console
foo@bar:~$ npm start
```

Check the server is running correctly on [localhost:3000](http://localhost:3000)

The browser should display the following web page with the continue button

![alt text](../screen-shots/home.png "home page")

Pressing the continue button should display the expected error status for the /question page route as we haven't created it yet

![alt text](../screen-shots/question(404).png "question page missing")

In the terminal, press control-C to stop the server.

### Completed journey-map-example part 1
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Journey map example part 2
Continue with [part 2](../journey-map-example-2/README.md)