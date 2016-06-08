'use strict'

const t = require('tcomb')
const fetch = require('node-fetch')
const { requestProperties, validateResponse, parseJSON } = require('../utils')

const PATH = '/images'

module.exports = function createImage(body) {
  t.Object(body)

  return new Promise((resolve, reject) => {
    const { href, headers } = requestProperties(
      this.token, this.version, PATH
    )

    body = JSON.stringify(body)
    fetch(href, { method: 'POST', body, headers })
      .then(validateResponse)
      .then(parseJSON)
      .then(resolve)
      .catch(reject)
  })
}
