'use strict'

const fetch = require('node-fetch')
const { requestProperties, validateResponse, parseJSON } = require('./utils')

const PATH = '/'

module.exports = function base() {
  return new Promise((resolve, reject) => {
    const { href, headers } = requestProperties(this.token, this.version, PATH)

    fetch(href, { headers })
      .then(validateResponse)
      .then(parseJSON)
      .then(resolve)
      .catch(reject)
  })
}
