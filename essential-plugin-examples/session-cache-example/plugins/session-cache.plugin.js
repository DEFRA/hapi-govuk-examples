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
