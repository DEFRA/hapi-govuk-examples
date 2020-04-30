# CSRF crumb example

Crumb diminishes CSRF attacks using a random unique token validated on the server and is a requirement for any DEFRA service.

The following example will build on the [journey map examples](../../journey-map-examples/README.md) and make use of the [crumb](https://www.npmjs.com/package/@hapi/crumb) plugin in a hapi server.

### Install the plugin
Use npm install
```console
foo@bar:~$ npm install @hapi/crumb
```

Create the new plugin plugins/csrf-crumb.plugin.js
```js
const cookieOptions = {
  isSecure: false,
  password: 'cookie password cookie password cookie password cookie password cookie password ',
  isHttpOnly: true,
  clearInvalid: true,
  strictHeader: true
}

module.exports = {
  plugin: require('@hapi/crumb'),
  options: {
    cookieOptions,
    key: 'CsrfToken',
    autoGenerate: true,
    logUnauthorized: true
  }
}
```

Edit the modules/form-layout.njk to include the CsrfToken block
```twig
{% extends "layout.njk" %}

{% from "govuk/components/button/macro.njk" import govukButton %}

{% block content %}
    <form method="post" autocomplete="off" novalidate>
        {% block CsrfToken %}
            <input id="csrf-crumb" type="hidden" name="CsrfToken" value="{{ CsrfToken }}">
        {% endblock %}

        {% block formContent %}
        {% endblock %}

        {{ govukButton({
            text: "Continue"
        }) }}
    </form>
{% endblock %}
```

Edit the index.js file to register the csrf-crumb plugin
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/csrf-crumb.plugin'))
  await server.register(require('./plugins/frontend.plugin'))
  await server.register(require('./plugins/journey-map.plugin'))
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

The application should still be working and blocking any posts that have not been issued from a page served by this service.

### Completed csrf crumb example
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Other essential plugins
Continue with the [other essential plugins](../README.md)
