'use strict'

import { stubObject, each } from 'lodash'
import { expect } from 'chai'
import * as utils from './utils'

describe('Utils', () => {

  describe('validateResponse()', () => {
    const { validateResponse } = utils

    it('should exist', () => {
      expect(validateResponse).to.exist
    })

    it('should export a method', () => {
      expect(validateResponse).to.be.a('function')
    })

    it('should require res argument to be defined as object', () => {
      expect(() => validateResponse()).to.throw
      expect(() => validateResponse(stubObject)).not.to.throw
    })

    it('should pass through on acceptable response status range', () => {
      each([200, 201, 204], status => {
        expect(() => validateResponse({ status })).not.to.throw
      })
    })

    it('should throw on redirect error', () => {
      each([301, 304], status => {
        expect(() => validateResponse({ status })).to.throw
      })
    })

    it('should throw on client error', () => {
      each([400, 401, 404], status => {
        expect(() => validateResponse({ status })).to.throw
      })
    })

    it('should throw on server error', () => {
      each([500, 503], status => {
        expect(() => validateResponse({ status })).to.throw
      })
    })

  })

})

describe('Test Utils', () => {
  const {
    generateTestToken,
    generateTestVersion,
    generateTestBindings
  } = utils

  describe('generateTestToken()', () => {

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
