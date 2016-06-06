'use strict'

import { expect } from 'chai'
import index from './index'

const API_METHODS = [
  'base'
]

describe('Library', () => {

  it('should exist', () => {
    expect(index).to.exist
  })

  it('should export method', () => {
    expect(index).to.be.a('function')
  })

  it('should require token string in method', () => {
    expect(() => index()).to.throw()
    expect(() => index([])).to.throw()
    expect(() => index('token')).not.to.throw()
  })

  it('should accept version string in method', () => {
    expect(() => index('token')).not.to.throw()
    expect(() => index('token', [])).to.throw()
    expect(() => index('token', 'version')).not.to.throw()
  })

  it('should return object from method', () => {
    expect(index('token')).to.be.an('object')
  })

  it('should contain all api methods in returned object', () => {
    expect(index('token')).to.have.all.keys([...API_METHODS, 'token', 'version'])
  })

  it('should return token property as defined', () => {
    const { token } = index('token')
    expect(token).to.equal('token')
  })

  it('should define version as \'latest\' if not defined', () => {
    const { version } = index('token')
    expect(version).to.equal('latest')
  })

  it('should prepend \'v\' to version if not defined as latest and not supplied', () => {
    expect(index('token', 'latest').version).to.equal('latest')
    expect(index('token', 'v0.4').version).to.equal('v0.4')
    expect(index('token', '0.4').version).to.equal('v0.4')
    expect(index('token', '2.0').version).to.equal('v2.0')
  })

})
