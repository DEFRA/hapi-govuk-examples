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
