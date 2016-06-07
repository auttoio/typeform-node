'use strict'

const fetch = require('node-fetch')
const { validateResponse } = require('./utils')

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
