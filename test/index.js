import * as chai from 'chai'
import FlickityTransformer from '../dist'

global.chai = chai
global.expect = global.chai.expect

describe('FlickityTransformer', () => {

  describe('constructor', () => {
    it('should export a constructor', () => {
      expect(FlickityTransformer).to.be.a('function')
    })

    it('should require two parameters', () => {
      expect(new FlickityTransformer).to.throw(Error)
    })
  })
})
