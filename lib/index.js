'use strict'

const { keyBy, bindAll, keys } = require('lodash')
const t = require('tcomb')

const api = keyBy([
  require('./base'),
  ...require('./designs/index'),
  ...require('./forms/index'),
  ...require('./images/index'),
  ...require('./urls/index')
], ({ name }) => name)

const methods = keys(api)

module.exports = function(token, version = 'latest') {
  t.String(token)
  t.String(version)

  if (version !== 'latest' && version[0] !== 'v') {

    // Prepend 'v' if not supplied in version
    //  e.g. '0.4' => 'v0.4'
    version = `v${version}`
  }

  return bindAll(Object.assign(api, { token, version }), methods)
}
