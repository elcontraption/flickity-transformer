import * as chai from 'chai'
import FlickityTransformer from '../src'

global.chai = chai
global.expect = global.chai.expect

const name = 'FlickityTransformer'

describe('FlickityTransformer', () => {
  it('should export a constructor', () => {
    expect(FlickityTransformer).to.be.a('function')
  })
})
