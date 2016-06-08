'use strict'

import { stubArray } from 'lodash'
import { expect } from 'chai'
import index from './index'
import { generateTestToken, generateTestVersion } from './utils'

const API_METHODS = [
  'base',
  'createDesign', 'getDesign',
  'createForm', 'getForm',
  'createImage', 'getImage',
  'createURL', 'getURL', 'updateURL', 'deleteURL'
]

describe('API', () => {
  const TEST_TOKEN = generateTestToken()
  const TEST_VERSION = generateTestVersion()

  it('should exist', () => {
    expect(index).to.exist
  })

  it('should export method', () => {
    expect(index).to.be.a('function')
  })

  it('should require token string in method', () => {
    expect(() => index()).to.throw()
    expect(() => index(stubArray)).to.throw()
    expect(() => index(TEST_TOKEN)).not.to.throw()
  })

  it('should accept version string in method', () => {
    expect(() => index(TEST_TOKEN)).not.to.throw()
    expect(() => index(TEST_TOKEN, stubArray)).to.throw()
    expect(() => index(TEST_TOKEN, TEST_VERSION)).not.to.throw()
  })

  it('should return object from method', () => {
    expect(index(TEST_TOKEN)).to.be.an('object')
  })

  it('should contain all api methods in returned object', () => {
    expect(index(TEST_TOKEN)).to.have.all.keys([...API_METHODS, 'token', 'version'])
  })

  it('should return token property as defined', () => {
    const { token } = index(TEST_TOKEN)
    expect(token).to.equal(TEST_TOKEN)
  })

  it('should define version as \'latest\' if not defined', () => {
    const { version } = index(TEST_TOKEN)
    expect(version).to.equal('latest')
  })

  it('should prepend \'v\' to version if not defined as latest and not supplied', () => {
    expect(index(TEST_TOKEN, TEST_VERSION).version).to.equal(TEST_VERSION)
    expect(index(TEST_TOKEN, 'latest').version).to.equal('latest')
    expect(index(TEST_TOKEN, 'v0.4').version).to.equal('v0.4')
    expect(index(TEST_TOKEN, '0.4').version).to.equal('v0.4')
    expect(index(TEST_TOKEN, '2.0').version).to.equal('v2.0')
  })

})
