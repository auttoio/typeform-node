'use strict'

import { bind, stubArray } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import getImage from './read'
import { res } from './fixtures.json'
import { generateTestBindings, requestProperties } from '../utils'

const PATH = '/images'

chai.use(chaiAsPromised)

describe('getImage()', () => {
  const bindings = generateTestBindings()
  const { token, version } = bindings
  const bound = bind(getImage, bindings)

  const { urlObject: { protocol, host, path } } = requestProperties(
    token, version, [PATH, res.id].join('/')
  )

  it('should exist', () => {
    expect(getImage).to.exist
  })

  it('should export method', () => {
    expect(getImage).to.be.a('function')
  })

  it('should export under correct name', () => {
    expect(getImage.name).to.equal('getImage')
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
