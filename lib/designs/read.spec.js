'use strict'

import { bind, stubArray } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import getDesign from './read'
import { res } from './fixtures.json'
import { generateTestBindings, requestProperties } from '../utils'

const PATH = '/designs'

chai.use(chaiAsPromised)

describe('getDesign()', () => {
  const bindings = generateTestBindings()
  const { token, version } = bindings
  const bound = bind(getDesign, bindings)

  const { urlObject: { protocol, host, path } } = requestProperties(
    token, version, [PATH, res.id].join('/')
  )

  it('should exist', () => {
    expect(getDesign).to.exist
  })

  it('should export method', () => {
    expect(getDesign).to.be.a('function')
  })

  it('should export under correct name', () => {
    expect(getDesign.name).to.equal('getDesign')
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
      .get(path)
      .reply(200, res)

    return expect(bound(res.id)).to.become(res)
  })

  it('should fail gracefully on request error', () => {
    nock(`${protocol}//${host}`)
      .get(path)
      .reply(500, {})

    return expect(bound(res.id)).to.eventually.be.rejected
  })

})
