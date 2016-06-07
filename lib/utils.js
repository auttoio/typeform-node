'use strict'

const url = require('url')
const { inRange } = require('lodash')
const t = require('tcomb')

const TYPEFORM_URL = 'https://api.typeform.io'

/**
 *  Construct properties for server-side requests
 *  @param {string} token
 *  @param {string} version
 *  @param {string} [path]
 *  @returns {object}
 */
module.exports.requestProperties = (token, version, path = '') => {
  t.String(token)
  t.String(version)
  t.String(path)

  if (path[0] === '/') {

    // Remove leading slash supplied in path
    //  e.g. '/path/name' => 'path/name'
    path = path.substr(1)
  }

  // Parse full urlObject from concatenated url string
  let urlObject = url.parse([TYPEFORM_URL, version, path].join('/'))

  // Format href string from object
  let href = url.format(urlObject)

  // Construct headers object
  let headers = {
    'X-API-TOKEN': token
  }

  return { urlObject, href, headers }
}

/**
 *  Validate response from server-side request
 *  @param {object} res
 *  @returns {object} res
 */
module.exports.validateResponse = res => {
  t.Object(res)

  if (!inRange(res.status, 200, 299)) {
    let err = new Error(res.statusText)
    err.res = res
    throw err
  }

  return res
}

/**
 *  Parse JSON in response from server-side request
 *  @param {object} res
 *  @returns {object} JSON
 */
module.exports.parseJSON = res => {
  t.struct({ json: t.Function }, 'res')(res)
  return res.json()
}

/**
 *  Generates test token
 *  @returns {string}
 */
module.exports.generateTestToken = () => {
  return 'n0deap1saysh1'
}

/**
 *  Generates test version
 *  @returns {string}
 */
module.exports.generateTestVersion = () => {
  return 'v0.4'
}

/**
 *  Generates test parameters for bound endpoints
 *  @returns {object}
 */
module.exports.generateTestBindings = () => {
  return {
    token: module.exports.generateTestToken(),
    version: module.exports.generateTestVersion()
  }
}
