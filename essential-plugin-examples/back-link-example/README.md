# Back link example

A back link is a requirement for any DEFRA service.

The following example will build on the [journey map examples](../../journey-map-examples/README.md) to provide a back link within the pages served in a hapi server.

Create the new plugin plugins/back-link.plugin.js
```js
module.exports = {
  plugin: {
    name: 'back-link',
    register: (server) => {
      server.ext('onPostHandler', (request, h) => {
        if (request.response.variety === 'view') {
          const { tags = [] } = request.route.settings
          // include the back link unless explicitly told not to
          request.response.source.context.includeBacklink = !tags.includes('hide-back-link')
        }
        return h.continue
      })
    }
  }
}
```

Create the new modules/back-link.njk component as follows:
```twig
<!-- Hide the back link with css if no-script -->
<noscript>
    <style>#back-link {display: none} </style>
</noscript>

{% from "govuk/components/back-link/macro.njk" import govukBackLink %}

{{ govukBackLink({
    text: "Back",
    href: "#",
    attributes: {
        id: "back-link",
        onclick: "window.history.go(-1); return false;"
    }
}) }}
```

Edit the modules/layout.njk to include the back-link within the beforeContent block
```twig
.
.
{% block beforeContent %}
    {% if includeBacklink %}
        {% include 'back-link.njk' %}
    {% endif %}
{% endblock %}
.
.
```
Edit the main map file modules/map.yml to add a tag to the home route to suppress the back link for the home page
```yaml
.
.
home:
  path: /
  route: home.route
  tags:
    - hide-back-link
.
.
```

Edit the index.js file to register the back-link plugin
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/frontend.plugin'))
  await server.register(require('./plugins/journey-map.plugin'))
  await server.register(require('./plugins/back-link.plugin'))
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

The home page should have no back link but subsequent pages should have a working [back link](https://design-system.service.gov.uk/components/back-link/)


### Completed back link example
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Other essential plugins
Continue with the [other essential plugins](../README.md)