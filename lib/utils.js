'use strict'

const { inRange } = require('lodash')
const t = require('tcomb')

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
