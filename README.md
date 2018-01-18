# Flickity Transformer

An interface for declaring granular transform effects for [Flickity](http://flickity.metafizzy.co/).

[![Demo image](demo.gif)](http://codepen.io/elcontraption/full/RGPboR/)

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)

## Installation
Via NPM:
```bash
yarn add flickity-transformer
# or
npm i --save flickity-transformer
```

Via download:
- Minified: [flickity-transformer.pkgd.min.js](https://unpkg.com/flickity-transformer/dist/flickity-transformer.pkgd.min.js)
- Un-minified: [flickity-transformer.pkgd.js](https://unpkg.com/flickity-transformer/dist/flickity-transformer.pkgd.js)

CDN:
```html
<!-- Minified -->
<script src="https://unpkg.com/flickity-transformer/dist/flickity-transformer.pkgd.min.js"></script>

<!-- Un-minified -->
<script src="https://unpkg.com/flickity-transformer/dist/flickity-transformer.pkgd.js"></script>
```

## Usage
Create a new FlickityTransformer, passing in your Flickity instance and an array of [transform objects](#transforms). Transforms will be applied to each Flickity cell in the order they are declared.

```js
var Flickity = require('flickity')
var FlickityTransformer = require('flickity-transformer')

var flkty = new Flickity('.carousel', {
  // options
})

var transformer = new FlickityTransformer(flkty, [
  {
    name: 'scale', // Let's scale your cells...
    stops: [
      [-300, 0.5], // at -300px, slides will be scaled to 0.5
      [0, 1], // at the home position, slides will be full size
      [300, 0.5] // at 300px, slides will be half size again
    ]
  },
  {
    name: 'rotate', // and add a little rotation...
    unit: 'rad' // use a unit other than the default
    stops: [
      [-300, -1], // rotate slides to the left by 1 radian
      [0, 0], // they'll be straight at center
      [300, 1] // and rotated to the right
      // Add as many stops as you need
    ]
  }
])
```

### Transforms
Each object in the transforms array requires at least two properties: `name` and `stops`. Each stop in `stops` is an array with two values: x position in pixels relative to the home position of your carousel, and the transform value to apply at that position.

| property      | type      | value             |
| ------------- | --------- | ----------------- |
| `name`        | `String`  | (required) The [transform function name](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function)
| `stops`       | `Array`   | (required) An array of at least two transform stops. |
| `unit`        | `String`  | (optional) Override the [default unit](#default-units). |

```js
// Example: rotate cells between -1rad at -300px, and 1rad at 300px:
{
  name: 'rotate',
  unit: 'rad',
  stops: [
    [-300, -1],
    [300, 1]
  ]
}
```

### Default units
```js
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
```

## Examples
- [Basic CodePen demo](http://codepen.io/elcontraption/pen/RGPboR)
- [Simple cover-flow example](http://codepen.io/elcontraption/pen/jrdOqr)

## Contributing
Contributions are welcome. Top priorities are to support `wrapAround: true` and units other than pixels for stop positions. See [issues](https://github.com/elcontraption/flickity-transformer/issues) for details. To get up and running:

```bash
# Install dependencies
$ npm install

# Lint, test & build
$ npm run build

# Run functional test in the browser
$ npm run functional

# See various scripts in package.json
```
Uses [JavaScript Standard Style](http://standardjs.com/).
