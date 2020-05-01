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
