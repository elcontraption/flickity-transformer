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
  rotateY: 'deg',
  translateX: 'px',
  translateY: 'px'
}

/**
 * The Flickity instance
 *
 * @type {Object}
 */
let flickity = {}

/**
 * Transforms to apply
 *
 * @type {Array}
 */
let transforms = []

/**
 * Array of Flickity cell elements
 *
 * @type {Array}
 */
let cellElements = []

/**
 * Constructor
 *
 * @param {Object} flkty The Flickity instance
 * @param {Array} txs Transforms array
 */
const FlickityTransformer = function (flkty, txs) {
  flickity = flkty
  transforms = txs
  cellElements = flickity.getCellElements()

  init()
}

/**
 * Initialize
 *
 * @return {null}
 */
function init () {
  createScaleFunctions()

  // Apply initial transforms
  flickity.slides.forEach(applyTransforms)

  // Apply again on scroll
  flickity.on('scroll', () => {
    flickity.slides.forEach(applyTransforms)
  })

  // Require a version of Flickity supporting `scroll` event
  if (flickity._events.scroll === undefined) {
    throw new Error(`${name} requires the first parameter to be a instance of Flickity that supports the \`scroll\` event (version 2+)`)
  }

  // Apply again on resize
  // TODO: debounce this?
  window.addEventListener('resize', () => {
    flickity.slides.forEach(applyTransforms)
  })
}

/**
 * Create scale functions for each transform
 *
 * @return {null}
 */
function createScaleFunctions () {
  transforms.forEach(transform => {
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
 *
 * @return {null}
 */
function applyTransforms (slide, i) {
  const el = cellElements[i]
  const txs = []
  let xPos

  // Get proximity to carousel home
  xPos = slide.parent.x < 0 ? slide.target - Math.abs(slide.parent.x) : slide.target + slide.parent.x

  // Make transforms
  transforms.forEach(transform => {
    txs.push(makeTransform(transform, xPos))
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
function makeTransform (transform, xPos) {
  const name = transform.name
  const unit = units[name] || ''
  const tx = transform.scale(xPos)

  return `${name}(${tx}${unit})`
}

/**
 * Exporter
 */
export default FlickityTransformer
