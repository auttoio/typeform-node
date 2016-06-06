'use strict'

const { inRange } = require('lodash')
const fetch = require('node-fetch')

function validateResponse(res) {
  if (!inRange(res.status, 200, 299)) {
    let err = new Error(res.statusText)
    err.res = res
    throw err
  }

  return res
}

module.exports = function base() {
  return new Promise((resolve, reject) => {
    fetch(`https://api.typeform.io/${this.version}/`, {
      headers: {
        'X-API-TOKEN': this.token
      }
    })
      .then(validateResponse)
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}
