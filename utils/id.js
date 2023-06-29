const Hashids = require('hashids/cjs')

function id ({ config }) {
  const hashids = new Hashids(config.secret)

  function encode (id) {
    return hashids.encode(id)
  }

  function decode(hash) {
    return hashids.decode(hash)[0]
  }

  return {
    encode,
    decode
  }
}

module.exports = id