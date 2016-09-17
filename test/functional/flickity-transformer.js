var FlickityTransformer = (function () {
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
var name = 'polylinearScale';

var config = {};

/**
 * The compiled scale to return
 *
 * @param  {Number} value The number to scale
 * @return {Number}       The result
 */
var scale = function scale(value) {
  var domains = config.domain;
  var ranges = config.range;
  var rangeMin;
  var rangeMax;
  var domain;
  var range;
  var ratio;
  var result;
  var i = 0;

  /* eslint-disable no-sequences */
  while (i < domains.length - 1) {
    if (value >= domains[i] && value <= domains[i + 1]) {
      domain = [domains[i], domains[i + 1]], range = [ranges[i], ranges[i + 1]];
      break;
    }
    i++;
  }

  // Value is outside given domain
  if (domain === undefined) {
    if (value < domains[0]) {
      domain = [domains[0], domains[1]];
      range = [ranges[0], ranges[1]];
    } else {
      domain = [domains[domains.length - 2], domains[domains.length - 1]];
      range = [ranges[ranges.length - 2], ranges[ranges.length - 1]];
    }
  }

  ratio = (range[1] - range[0]) / (domain[1] - domain[0]);
  result = range[0] + ratio * (value - domain[0]);

  if (config.clamp) {
    rangeMin = Math.min(range[0], range[1]);
    rangeMax = Math.max(range[0], range[1]);
    result = Math.min(rangeMax, Math.max(rangeMin, result));
  }

  return result;
};

/**
 * A polylinear scale
 *
 * Supports multiple piecewise linear scales that divide a continuous domain and range.
 *
 * @param  {Array} domain     Two or more numbers
 * @param  {Array} range      Numbers equivalent to number in `domain`
 * @param  {Boolean} clamp    Enables or disables clamping
 * @return {Function}         Scale function
 */
function polylinearScale(domain, range, clamp) {
  domain = domain || [0, 1];
  range = range || [0, 1];
  clamp = clamp || false;

  if (domain.length !== range.length) {
    throw new Error(name + ' requires domain and range to have an equivalent number of values');
  }

  config.domain = domain;
  config.range = range;
  config.clamp = clamp;

  return scale;
}

module.exports = polylinearScale;
});

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
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  skew: 'deg',
  skewX: 'deg',
  skewY: 'deg',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px'
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
 * @param {Array} txs Transforms array
 */
var FlickityTransformer = function FlickityTransformer(flkty, txs) {
  flickity = flkty;
  transforms = txs;
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

    // Create unique scale function
    transform.scale = function (value) {
      return index(domain, range, true)(value);
    };
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
  // const unit = units[name] || ''
  var unit = transform.unit || units[name] || '';
  var tx = transform.scale(xPos);

  return name + '(' + tx + unit + ')';
}

return FlickityTransformer;

}());