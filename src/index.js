import polylinearScale from 'polylinear-scale'

/**
 * Module name
 *
 * @type {String}
 */
const name = 'FlickityTransformer'

/**
 * Set default units
 *
 * @type {Object}
 */
const units = {
  perspective: 'px',
  rotate: 'deg',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  skew: 'deg',
  skewX: 'deg',
  skewY: 'deg',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px'
}

class FlickityTransformer {
  constructor (flickity, transforms) {
    this.flickity = flickity
    this.transforms = transforms
    this.cellElements = flickity.getCellElements()

    this.init()
  }

  /**
   * Initialize
   */
  init () {
    this.createScaleFunctions()

    // Apply initial transforms
    this.flickity.slides.forEach(this.applyTransforms.bind(this))

    // Apply again on scroll
    this.flickity.on('scroll', () => {
      this.flickity.slides.forEach(this.applyTransforms.bind(this))
    })

    // Require a version of Flickity supporting `scroll` event
    if (this.flickity._events.scroll === undefined) {
      throw new Error(`${name} requires the first parameter to be a instance of Flickity that supports the \`scroll\` event (version 2+)`)
    }

    // Apply again on resize
    window.addEventListener('resize', () => {
      this.flickity.slides.forEach(this.applyTransforms.bind(this))
    })
  }

  /**
   * Create scale functions for each transform
   */
  createScaleFunctions () {
    this.transforms.forEach(transform => {
      const domain = []
      const range = []

      transform.stops.forEach(stop => {
        domain.push(stop[0])
        range.push(stop[1])
      })

      // Create unique scale function
      transform.scale = function (value) {
        return polylinearScale(domain, range, true)(value)
      }
    })
  }

  /**
   * Apply transforms to an element
   *
   * @param  {Object} el Flickity element
   * @param  {Integer} i  Element index
   */
  applyTransforms (slide, i) {
    const el = this.cellElements[i]
    const txs = []
    let xPos

    // Get proximity to carousel home
    xPos = slide.parent.x < 0 ? slide.target - Math.abs(slide.parent.x) : slide.target + slide.parent.x

    // Make transforms
    this.transforms.forEach(transform => {
      txs.push(this.makeTransform(transform, xPos))
    })

    // Apply transforms
    el.style.transform = txs.join(' ')
  }

  /**
   * Make an individual transform rule
   *
   * @param  {Object} transform The transform declaration
   * @param  {Number} xPos Element's proximity to carousel home
   * @return {String}
   */
  makeTransform (transform, xPos) {
    const name = transform.name
    // const unit = units[name] || ''
    const unit = transform.unit || units[name] || ''
    const tx = transform.scale(xPos)

    return `${name}(${tx}${unit})`
  }
}

/**
 * Exporter
 */
export default FlickityTransformer
