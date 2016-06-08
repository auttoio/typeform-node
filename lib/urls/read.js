'use strict'

const t = require('tcomb')
const fetch = require('node-fetch')
const { requestProperties, validateResponse, parseJSON } = require('../utils')

const PATH = '/urls'

module.exports = function getURL(id) {
  t.String(id)

  return new Promise((resolve, reject) => {
    const { href, headers } = requestProperties(
      this.token, this.version, [PATH, id].join('/')
    )

    fetch(href, { headers })
      .then(validateResponse)
      .then(parseJSON)
      .then(resolve)
      .catch(reject)
  })
}
