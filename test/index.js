import * as chai from 'chai'
import FlickityTransformer from '../src'

global.chai = chai
global.expect = global.chai.expect

const name = 'FlickityTransformer'

describe('FlickityTransformer', () => {
  it('should export a constructor', () => {
    expect(FlickityTransformer).to.be.a('function')
  })

  it('should require two parameters', () => {
    expect(FlickityTransformer).to.throw(`${name} requires two parameters`)
  })

  // it('should require a version of Flickity that includes the `scroll` event', () => {
  //   const ftx = () => {
  //     new FlickityTransformer({
  //       _events: {}
  //     }, {})
  //   }
  //
  //   expect(ftx).to.throw(`${name} requires the first parameter to be a instance of Flickity that supports the \`scroll\` event (version 2+)`)
  // })

  it('should require the second parameter contains `transforms` array', () => {
    const ftx = () => {
      new FlickityTransformer({
        _events: { scroll: [] }
      }, {})
    }

    expect(ftx).to.throw(`${name} requires the second parameter contain a \`transforms\` array`)
  })
})