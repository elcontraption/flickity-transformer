'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var polylinearScale = _interopDefault(require('polylinear-scale'));

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

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

var FlickityTransformer = function () {
  function FlickityTransformer(flickity, transforms) {
    classCallCheck(this, FlickityTransformer);

    this.flickity = flickity;
    this.transforms = transforms;
    this.cellElements = flickity.getCellElements();

    this.init();
  }

  /**
   * Initialize
   */


  createClass(FlickityTransformer, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.createScaleFunctions();

      // Apply initial transforms
      this.flickity.slides.forEach(this.applyTransforms.bind(this));

      // Apply again on scroll
      this.flickity.on('scroll', function () {
        _this.flickity.slides.forEach(_this.applyTransforms.bind(_this));
      });

      // Require a version of Flickity supporting `scroll` event
      if (this.flickity._events.scroll === undefined) {
        throw new Error(name + ' requires the first parameter to be a instance of Flickity that supports the `scroll` event (version 2+)');
      }

      // Apply again on resize
      window.addEventListener('resize', function () {
        _this.flickity.slides.forEach(_this.applyTransforms.bind(_this));
      });
    }

    /**
     * Create scale functions for each transform
     */

  }, {
    key: 'createScaleFunctions',
    value: function createScaleFunctions() {
      this.transforms.forEach(function (transform) {
        var domain = [];
        var range = [];

        transform.stops.forEach(function (stop) {
          domain.push(stop[0]);
          range.push(stop[1]);
        });

        // Create unique scale function
        transform.scale = function (value) {
          return polylinearScale(domain, range, true)(value);
        };
      });
    }

    /**
     * Apply transforms to an element
     *
     * @param  {Object} el Flickity element
     * @param  {Integer} i  Element index
     */

  }, {
    key: 'applyTransforms',
    value: function applyTransforms(slide, i) {
      var _this2 = this;

      var el = this.cellElements[i];
      var txs = [];
      var xPos = void 0;

      // Get proximity to carousel home
      xPos = slide.parent.x < 0 ? slide.target - Math.abs(slide.parent.x) : slide.target + slide.parent.x;

      // Make transforms
      this.transforms.forEach(function (transform) {
        txs.push(_this2.makeTransform(transform, xPos));
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

  }, {
    key: 'makeTransform',
    value: function makeTransform(transform, xPos) {
      var name = transform.name;
      // const unit = units[name] || ''
      var unit = transform.unit || units[name] || '';
      var tx = transform.scale(xPos);

      return name + '(' + tx + unit + ')';
    }
  }]);
  return FlickityTransformer;
}();

module.exports = FlickityTransformer;