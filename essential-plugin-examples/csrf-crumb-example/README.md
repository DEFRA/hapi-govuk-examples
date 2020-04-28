# CSRF crumb example

Crumb diminishes CSRF attacks using a random unique token validated on the server and is a requirement for any DEFRA service.

The following example will build on the [front end examples](../../front-end-examples/README.md) and make use of the [crumb](https://www.npmjs.com/package/@hapi/crumb) plugin in a hapi server.

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
