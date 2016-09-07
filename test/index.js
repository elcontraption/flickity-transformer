import * as chai from 'chai'
import FlickityTransformer from '../dist'

global.chai = chai
global.expect = global.chai.expect

describe('FlickityTransformer', () => {
  it('should be able to initialize with new', () => {
    const ftx = new FlickityTransformer()

    expect(ftx).to.be.an('object')
  })
})
