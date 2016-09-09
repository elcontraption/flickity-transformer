import { scaleLinear } from 'd3-scale'

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
 * @param {Object} opts  Configuration options
 */
const FlickityTransformer = function (flkty, opts) {
  // Require two parameters
  if (arguments.length < 2) {
    throw new Error(`${name} requires two parameters`)
  }

  // Require `transforms` array in `opts`
  if (opts.transforms === undefined) {
    throw new Error(`${name} requires the second parameter contain a \`transforms\` array`)
  }

  flickity = flkty
  transforms = opts.transforms
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
    cellElements.forEach(applyTransforms)
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

    // Create scale function
    transform.scale = scaleLinear().domain(domain).range(range).clamp(true)
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
  const prop = transform.property
  const unit = units[prop] || ''
  const tx = transform.scale(xPos)

  return `${prop}(${tx}${unit})`
}

/**
 * Exporter
 */
export default FlickityTransformer
