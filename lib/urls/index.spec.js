'use strict'

import { expect } from 'chai'
import index from './index'

describe('URLs', () => {

  it('should exist', () => {
    expect(index).to.exist
  })

  it('should export array', () => {
    expect(index).to.be.an('array')
  })

  it('should export all methods', () => {
    expect(index).to.have.length(4)
  })

})
