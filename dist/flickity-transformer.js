'use strict';

var d3Scale = require('d3-scale');

/**
 * Module name
 *
 * @type {String}
 */
var name = 'FlickityTransformer';

/**
 * Set default units
 *
 * @type {Object}
 */
var units = {
  perspective: 'px',
  rotate: 'deg',
  rotateY: 'deg',
  translateX: 'px',
  translateY: 'px'
};

/**
 * The Flickity instance
 *
 * @type {Object}
 */
var flickity = {};

/**
 * Transforms to apply
 *
 * @type {Array}
 */
var transforms = [];

/**
 * Array of Flickity cell elements
 *
 * @type {Array}
 */
var cellElements = [];

/**
 * Constructor
 *
 * @param {Object} flkty The Flickity instance
 * @param {Object} opts  Configuration options
 */
var FlickityTransformer = function FlickityTransformer(flkty, opts) {
  // Require two parameters
  if (arguments.length < 2) {
    throw new Error(name + ' requires two parameters');
  }

  // Require `transforms` array in `opts`
  if (opts.transforms === undefined) {
    throw new Error(name + ' requires the second parameter contain a `transforms` array');
  }

  flickity = flkty;
  transforms = opts.transforms;
  cellElements = flickity.getCellElements();

  init();
};

/**
 * Initialize
 *
 * @return {null}
 */
function init() {
  createScaleFunctions();

  // Apply initial transforms
  flickity.slides.forEach(applyTransforms);

  // Apply again on scroll
  flickity.on('scroll', function () {
    flickity.slides.forEach(applyTransforms);
  });

  // Require a version of Flickity supporting `scroll` event
  if (flickity._events.scroll === undefined) {
    throw new Error(name + ' requires the first parameter to be a instance of Flickity that supports the `scroll` event (version 2+)');
  }

  // Apply again on resize
  // TODO: debounce this?
  window.addEventListener('resize', function () {
    flickity.slides.forEach(applyTransforms);
  });
}

/**
 * Create scale functions for each transform
 *
 * @return {null}
 */
function createScaleFunctions() {
  transforms.forEach(function (transform) {
    var domain = [];
    var range = [];

    transform.stops.forEach(function (stop) {
      domain.push(stop[0]);
      range.push(stop[1]);
    });

    // Create scale function
    transform.scale = d3Scale.scaleLinear().domain(domain).range(range).clamp(true);
  });
}

/**
 * Apply transforms to an element
 *
 * @param  {Object} el Flickity element
 * @param  {Integer} i  Element index
 *
 * @return {null}
 */
function applyTransforms(slide, i) {
  var el = cellElements[i];
  var txs = [];
  var xPos = void 0;

  // Get proximity to carousel home
  xPos = slide.parent.x < 0 ? slide.target - Math.abs(slide.parent.x) : slide.target + slide.parent.x;

  // Make transforms
  transforms.forEach(function (transform) {
    txs.push(makeTransform(transform, xPos));
  });

  // Apply transforms
  el.style.transform = txs.join(' ');
}

/**
 * Make an individual transform rule
 *
 * @param  {Object} transform The transform declaration
 * @param  {Number} xPos Element's proximity to carousel home
 * @return {String}
 */
function makeTransform(transform, xPos) {
  var name = transform.name;
  var unit = units[name] || '';
  var tx = transform.scale(xPos);

  return name + '(' + tx + unit + ')';
}

module.exports = FlickityTransformer;