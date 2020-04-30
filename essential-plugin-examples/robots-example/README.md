# Robots example

Preventing search engines from crawling through a service is a DEFRA requirement.

The following example will build on the [journey map examples](../../journey-map-examples/README.md) and make use of the [hapi-robots](https://www.npmjs.com/package/hapi-robots) plugin in a hapi server.

### Install the plugin
Use npm install
```console
foo@bar:~$ npm install hapi-robots
```

Create the new plugin plugins/robots.plugin.js
```js
'use strict'

module.exports = {
  plugin: require('hapi-robots'),
  options: {
    // will disallow everyone from every path:
    '*': ['/']
  }
}
```

Edit the index.js file to register the robots plugin
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
  await server.register(require('./plugins/robots.plugin'))
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

The browser should render the following at http://localhost:3000/robots.txt
```text
User-agent: *
Disallow: /
```

### Completed robots example
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Other essential plugins
Continue with the [other essential plugins](../README.md)