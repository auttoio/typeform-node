'use strict'

const t = require('tcomb')
const fetch = require('node-fetch')
const { requestProperties, validateResponse, parseJSON } = require('../utils')

const PATH = '/urls'

module.exports = function updateURL(id, body) {
  t.String(id)
  t.Object(body)

  return new Promise((resolve, reject) => {
    const { href, headers } = requestProperties(
      this.token, this.version, [PATH, id].join('/')
    )

    body = JSON.stringify(body)
    fetch(href, { method: 'PUT', body, headers })
      .then(validateResponse)
      .then(parseJSON)
      .then(resolve)
      .catch(reject)
  })
}
