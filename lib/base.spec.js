'use strict'

import { bind } from 'lodash'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import base from './base'
import SAMPLE_RES from './base.fixtures.json'

chai.use(chaiAsPromised)

describe('Base', () => {
  const token = 'n0deap1saysh1'
  const version = 'latest'
  const bound = bind(base, { token, version })

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
    nock('https://api.typeform.io')
      .get(`/${version}/`)
      .reply(200, SAMPLE_RES)

    return expect(bound()).to.become(SAMPLE_RES)
  })

  it('should fail gracefully on request error', () => {
    nock('https://api.typeform.io')
      .get(`/${version}/`)
      .reply(500, {})

    return expect(bound()).to.eventually.be.rejected
  })

})
