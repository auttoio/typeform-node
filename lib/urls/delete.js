'use strict'

const t = require('tcomb')
const fetch = require('node-fetch')
const { requestProperties, validateResponse } = require('../utils')

const PATH = '/urls'

module.exports = function deleteURL(id) {
  t.String(id)

  return new Promise((resolve, reject) => {
    const { href, headers } = requestProperties(
      this.token, this.version, [PATH, id].join('/')
    )

    fetch(href, { method: 'DELETE', headers })
      .then(validateResponse)
      .then(resolve)
      .catch(reject)
  })
}
