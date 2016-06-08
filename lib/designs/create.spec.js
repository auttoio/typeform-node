'use strict'

import { bind, stubArray } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import createDesign from './create'
import { req, res } from './fixtures.json'
import { generateTestBindings, requestProperties } from '../utils'

const PATH = '/designs'

chai.use(chaiAsPromised)

describe('createDesign()', () => {
  const bindings = generateTestBindings()
  const { token, version } = bindings
  const bound = bind(createDesign, bindings)

  const { urlObject: { protocol, host, path } } = requestProperties(
    token, version, PATH
  )

  it('should exist', () => {
    expect(createDesign).to.exist
  })

  it('should export method', () => {
    expect(createDesign).to.be.a('function')
  })

  it('should export under correct name', () => {
    expect(createDesign.name).to.equal('createDesign')
  })

  it('should require data argument as object', () => {
    expect(() => bound()).to.throw
    expect(() => bound(stubArray)).to.throw
    expect(() => bound(req)).not.to.throw
  })

  it('should return a promise', () => {
    expect(bound(req)).to.be.a('promise')
  })

  it('should resolve data from endpoint', () => {
    nock(`${protocol}//${host}`)
      .post(path)
      .reply(201, res)

    return expect(bound(req)).to.become(res)
  })

  it('should fail gracefully on request error', () => {
    nock(`${protocol}//${host}`)
      .post(path)
      .reply(500, {})

    return expect(bound(req)).to.eventually.be.rejected
  })

})
