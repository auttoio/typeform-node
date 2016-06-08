'use strict'

import { bind } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import base from './base'
import { res } from './base.fixtures.json'
import { generateTestBindings, requestProperties } from './utils'

const PATH = '/'

chai.use(chaiAsPromised)

describe('base()', () => {
  const bindings = generateTestBindings()
  const { token, version } = bindings
  const bound = bind(base, bindings)

  const { urlObject: { protocol, host, path } } = requestProperties(
    token, version, PATH
  )

  it('should exist', () => {
    expect(base).to.exist
  })

  it('should export method', () => {
    expect(base).to.be.a('function')
  })

  it('should export under correct name', () => {
    expect(base.name).to.equal('base')
  })

  it('should return a promise', () => {
    expect(bound()).to.be.a('promise')
  })

  it('should resolve data from endpoint', () => {
    nock(`${protocol}//${host}`)
      .get(path)
      .reply(200, res)

    return expect(bound()).to.become(res)
  })

  it('should fail gracefully on request error', () => {
    nock(`${protocol}//${host}`)
      .get(path)
      .reply(500, {})

    return expect(bound()).to.eventually.be.rejected
  })

})
