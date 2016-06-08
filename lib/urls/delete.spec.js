'use strict'

import { bind, stubArray } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import deleteURL from './delete'
import { res } from './fixtures.json'
import { generateTestBindings, requestProperties } from '../utils'

const PATH = '/urls'

chai.use(chaiAsPromised)

describe('deleteURL()', () => {
  const bindings = generateTestBindings()
  const { token, version } = bindings
  const bound = bind(deleteURL, bindings)

  const { urlObject: { protocol, host, path } } = requestProperties(
    token, version, [PATH, res.id].join('/')
  )

  it('should exist', () => {
    expect(deleteURL).to.exist
  })

  it('should export method', () => {
    expect(deleteURL).to.be.a('function')
  })

  it('should export under correct name', () => {
    expect(deleteURL.name).to.equal('deleteURL')
  })

  it('should require id argument as string', () => {
    expect(() => bound()).to.throw
    expect(() => bound(stubArray)).to.throw
    expect(() => bound(res.id)).not.to.throw
  })

  it('should return a promise', () => {
    expect(bound(res.id)).to.be.a('promise')
  })

  it('should resolve data from endpoint', () => {
    nock(`${protocol}//${host}`)
      .delete(path)
      .reply(204)

    return expect(bound(res.id)).to.be.fulfilled
  })

  it('should fail gracefully on request error', () => {
    nock(`${protocol}//${host}`)
      .delete(path)
      .reply(500, {})

    return expect(bound(res.id)).to.eventually.be.rejected
  })

})
