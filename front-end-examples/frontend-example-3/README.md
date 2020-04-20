# Frontend example part 3
Please note that this continues with the project built within [example 2](https://github.com/DEFRA/hapi-govuk-examples/tree/master/front-end-examples/frontend-example-2)

### Break the project down into it's component parts
In order to make it easier to maintain the project and add both additional plugins and routes, the project files need to be broken down into separate files.

Create a separate routes folder
```console
foo@bar:~$ mkdir routes
```

Create the file home.route.js within the routes folder containing the following
```js
'use strict'

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => h.view('hello-world', {
    pageHeading: 'Hello World!',
    pageText: 'Here is my first GOV.UK Design System styled page'
  })
}
```

Create a separate plugins folder
```console
foo@bar:~$ mkdir plugins
```

Create the file frontend.plugin.js within the plugins folder containing the following
```js
'use strict'

const pkg = require('../package.json')

module.exports = {
  plugin: require('@envage/hapi-govuk-frontend'),
  options: {
    assetPath: '/assets',
    assetDirectories: ['public/static', 'public/build'],
    serviceName: 'My Generic Government Service',
    viewPath: 'views',
    includePaths: [],
    context: {
      appVersion: pkg.version
    }
  }
}
```

Edit the index.js file to import (require) the above files as follows
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
  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
```

Make sure all the javascript files above are formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

Create a layout in the views folder as layout.njk containing the following
```twig
{% extends "govuk/template.njk" %}

{% from "govuk/components/header/macro.njk" import govukHeader %}

{% block head %}
    <link href="{{ assetPath }}/stylesheets/application.css" rel="stylesheet"/>
{% endblock %}

{% block header %}
    {{ govukHeader({
        homepageUrl: "#",
        containerClasses: "govuk-width-container",
        serviceName: serviceName,
        serviceUrl: "/"
    }) }}
{% endblock %}

{% block pageTitle %}
    {{ pageHeading }} - {{ pageTitle }}
{% endblock %}

{% block bodyEnd %}
    <script src="{{ assetPath }}/all.js"></script>
    <script>window.GOVUKFrontend.initAll()</script>
{% endblock %}
```

Edit the view hello-world.njk so that it extends the layout above
```twig
{% extends "layout.njk" %}

{% block content %}
    <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
    <p class="govuk-body">{{ pageText }}</p>
{% endblock %}
```

Restart the server
```console
foo@bar:~$ node index
```

Check the server is running correctly on [localhost:3000](http://localhost:3000) again

The browser should display the same [GOV.UK Design System styled](https://design-system.service.gov.uk/) web page with the heading **Hello World!** as before

![alt text](https://raw.githubusercontent.com/DEFRA/hapi-govuk-examples/master/front-end-examples/screen-shots/gds-styled-hello-world.png "GOV.UK Design System styled screen-shot")

### Completed frontend-example part 2
If all the steps above, have been followed correctly, the project should contain the files found [here](https://github.com/DEFRA/hapi-govuk-examples/tree/master/front-end-examples/frontend-example-3)












