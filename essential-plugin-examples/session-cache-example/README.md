# Session cache example

Provide a way to use session data without storing the data in the users cookies.

The following example will build on the [journey map examples](../../journey-map-examples/README.md) and make use of the [@hapi/yar](https://www.npmjs.com/package/@hapi/yar) plugin in a hapi server.

### Install the plugin and other dependencies
Use npm install
```console
foo@bar:~$ npm install @hapi/yar @hapi/hoek
```

Create the new plugin plugins/session-cache.plugin.js
```js
const cookieOptions = {
  password: '3ADpJGYStKUtOM5By9GYW3FbVL5EDgFi5CzQ1ibC3CeiwI7FaV79Fb45NYLcQC8t9m',
  isSecure: false,
  isHttpOnly: true,
  clearInvalid: true,
  strictHeader: true
}

module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    cache: {
      expiresIn: 60 * 60 * 1000 // 1 hour
    },
    maxCookieSize: 0, // Forces server-side storage only
    storeBlank: false,
    cookieOptions
  }
}
```

Edit the index.js file to register the session-cache plugin
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/session-cache.plugin'))
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

Create a new cache utility file utils/cache.js

(_Wrapping the @hapi/yar functionality is useful when creating unit tests_)
```js
const Hoek = require('@hapi/hoek')

module.exports = class Cache {
  constructor (key) {
    this.key = key
  }

  get (request) {
    return Hoek.clone(request.yar.get(this.key) || {})
  }

  set (request, data = {}) {
    const cache = this.get(request)
    Hoek.merge(cache, data)
    request.yar.set(this.key, cache)
  }

  clear (request) {
    request.yar.clear(this.key)
  }

  static reset (request) {
    request.yar.reset()
  }
}
```

Now edit the plugin plugins/journey-map.plugin.js to replace the cache with session cache
```js
const { resolve } = require('path')
const Cache = require('../utils/cache')

const QueryData = new Cache('QueryData')

module.exports = {
  plugin: require('@envage/hapi-govuk-journey-map'),
  options: {
    modulePath: resolve(`${process.cwd()}/modules`),
    getQueryData: (request) => QueryData.get(request),
    setQueryData: (request, data) => QueryData.set(request, data),
    journeyMapPath: '/journey-map'
  }
}
```

For now, clear the session cache whenever the user loads the home page.
Edit modules/home.route.js as follows
```js
'use strict'

const Cache = require('../utils/cache')

module.exports = [{
  method: 'GET',
  handler: (request, h) => {
    // Visiting the home page will clear all the session cache
    Cache.reset(request)

    return h.view('home', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GOV.UK Design System styled page'
    })
  }
}, {
  method: 'POST',
  handler: (request, h) => h.continue
}]
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

The application should work as it did before except the data collected as you visit each page should stay in the session until you revisit the home page when it'll be cleared

### Completed session-cache example
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Other essential plugins
Continue with the [other essential plugins](../README.md)

---------------------------------------------

### Bonus functionality

If you wish to extend this with an in-memory database, you can implement [redis](https://redis.io/) support with [@hapi/catbox-redis](https://www.npmjs.com/package/@hapi/catbox-redis)
and change your index.js to include your cache config in your server options as follows:
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    cache: {
      provider: {
        constructor: require('@hapi/catbox-redis'),
        options: {
          partition: 'hapi-cache',
          port: process.env.REDIS_PORT,
          host: process.env.REDIS_HOST
        }
      }
    }
  })

  await server.register(require('./plugins/session-cache.plugin'))
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