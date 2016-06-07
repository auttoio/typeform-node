'use strict'

import { expect } from 'chai'
import * as utils from './utils'

describe('Utils', () => {

  describe('generateTestToken()', () => {
    const { generateTestToken } = utils

    it('should exist', () => {
      expect(generateTestToken).to.exist
    })

    it('should export a method', () => {
      expect(generateTestToken).to.be.a('function')
    })

    it('should generate test token in correct format', () => {
      expect(generateTestToken()).to.equal('n0deap1saysh1')
    })

  })

  describe('generateTestVersion()', () => {
    const { generateTestVersion } = utils

    it('should exist', () => {
      expect(generateTestVersion).to.exist
    })

    it('should export a method', () => {
      expect(generateTestVersion).to.be.a('function')
    })

    it('should generate test version in correct format', () => {
      expect(generateTestVersion()).to.equal('v0.4')
    })

  })

  describe('generateTestBindings()', () => {
    const {
      generateTestToken,
      generateTestVersion,
      generateTestBindings
    } = utils

    it('should exist', () => {
      expect(generateTestBindings).to.exist
    })

    it('should export a method', () => {
      expect(generateTestBindings).to.be.a('function')
    })

    it('should generate all bindings at correct keys', () => {
      expect(generateTestBindings()).to.have.all.keys(['token', 'version'])
    })

    it('should generate bound test token from existing utility', () => {
      const { token } = generateTestBindings()
      expect(token).to.equal(generateTestToken())
    })

    it('should generate bound test version from existing utility', () => {
      const { version } = generateTestBindings()
      expect(version).to.equal(generateTestVersion())
    })

  })

})
