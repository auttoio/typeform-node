'use strict'

import { bind, stubArray } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import updateURL from './update'
import { req, res } from './fixtures.json'
import { generateTestBindings, requestProperties } from '../utils'

const PATH = '/urls'

chai.use(chaiAsPromised)

describe('updateURL()', () => {
  const bindings = generateTestBindings()
  const { token, version } = bindings
  const bound = bind(updateURL, bindings)

  const { urlObject: { protocol, host, path } } = requestProperties(
    token, version, [PATH, res.id].join('/')
  )

  it('should exist', () => {
    expect(updateURL).to.exist
  })

  it('should export method', () => {
    expect(updateURL).to.be.a('function')
  })

  it('should export under correct name', () => {
    expect(updateURL.name).to.equal('updateURL')
  })

  it('should require id and data arguments as string and object respectively', () => {
    expect(() => bound()).to.throw
    expect(() => bound(stubArray)).to.throw
    expect(() => bound(res.id)).to.throw
    expect(() => bound(stubArray, stubArray)).to.throw
    expect(() => bound(res.id, stubArray)).to.throw
    expect(() => bound(res.id, req)).not.to.throw
  })

  it('should return a promise', () => {
    expect(bound(res.id, req)).to.be.a('promise')
  })

  it('should resolve data from endpoint', () => {
    nock(`${protocol}//${host}`)
      .put(path)
      .reply(201, res)

    return expect(bound(res.id, req)).to.become(res)
  })

  it('should fail gracefully on request error', () => {
    nock(`${protocol}//${host}`)
      .put(path)
      .reply(500, {})

    return expect(bound(res.id, req)).to.eventually.be.rejected
  })

})
