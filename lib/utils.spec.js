'use strict'

import url from 'url'
import { stubArray, stubObject, each, noop } from 'lodash'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import * as utils from './utils'

chai.use(sinonChai)
describe('Test Utils', () => {

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

describe('Utils', () => {

  describe('requestProperties()', () => {
    const {
      generateTestToken,
      generateTestVersion,
      requestProperties
    } = utils

    it('should exist', () => {
      expect(requestProperties).to.exist
    })

    it('should export a method', () => {
      expect(requestProperties).to.be.a('function')
    })

    it('should require token and version arguments as strings', () => {
      expect(() => requestProperties()).to.throw
      expect(() => requestProperties(stubArray)).to.throw
      expect(() => requestProperties(stubArray, stubArray)).to.throw
      expect(() => requestProperties(generateTestToken())).to.throw
      expect(() => requestProperties(stubArray, generateTestVersion())).to.throw
      expect(() => requestProperties(generateTestToken(), generateTestVersion())).not.to.throw
    })

    it('should accept optional path argument as string', () => {
      expect(() => (
        requestProperties(generateTestToken(), generateTestVersion(), stubArray)
      )).to.throw
      expect(() => (
        requestProperties(generateTestToken(), generateTestVersion(), '/')
      )).not.to.throw
    })

    describe('object', () => {
      const token = generateTestToken()
      const version = generateTestVersion()
      const props = requestProperties(token, version)
      const URL = `https://api.typeform.io/${version}/`

      it('should return object', () => {
        expect(props).to.be.an('object')
      })

      it('should return property for href string', () => {
        const { href } = props
        expect(href).to.equal(URL)
      })

      it('should return property for full urlObject', () => {
        const { urlObject } = props
        const expectedObject = url.parse(URL)

        expect(urlObject).to.be.an('object')
        expect(urlObject).to.eql(expectedObject)
      })

      it('should return property for headers object with required auth headers', () => {
        const { headers } = props

        expect(headers).to.be.an('object')
        expect(headers).to.have.property('X-API-TOKEN')
        expect(headers['X-API-TOKEN']).to.equal(token)
      })

      it('should omit leading slash for path if supplied', () => {
        const { urlObject: { path } } = requestProperties(
          generateTestToken(), generateTestVersion(), '/form'
        )

        expect(path).not.to.contain('//form')
      })

    })

  })

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

  describe('parseJSON()', () => {
    const { parseJSON } = utils

    it('should exist', () => {
      expect(parseJSON).to.exist
    })

    it('should export a method', () => {
      expect(parseJSON).to.be.a('function')
    })

    it('should require res argument to be defined as fetch object', () => {
      expect(() => parseJSON()).to.throw
      expect(() => parseJSON(stubObject)).to.throw
      expect(() => parseJSON({ json: noop })).not.to.throw
    })

    it('should return result of json() method in fetch object', () => {
      const output = stubObject
      const stub = sinon.stub()
      stub.returns(output)

      expect(parseJSON({ json: stub })).to.eql(output)
      expect(stub).to.have.been.calledOnce
    })

  })

})
