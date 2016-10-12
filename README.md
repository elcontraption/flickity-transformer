# Flickity Transformer

Open up [Metafizzy's](http://metafizzy.co/) amazing [Flickity](http://flickity.metafizzy.co/) to a virtually limitless array of transform effects.

[![Demo image](demo.gif)](http://codepen.io/elcontraption/full/RGPboR/)

Flickity Transformer provides a powerful interface to declare granular transform effects on carousel slides:

```js
{
  name: 'scale', // Let's scale your slides...
  stops: [
    [-300, 0.5], // at -300px, slides will be scaled to 0.5
    [0, 1], // at the home position, slides will be full size
    [300, 0.5] // at 300px, slides will be half size again
  ]
},
{
  name: 'rotate', // and add a little rotation...
  unit: 'rad', // use a unit other than the default
  stops: [
    [-300, -30], // rotate slides to the left
    [0, 0], // they'll be straight at center
    [300, 30] // and rotated to the right
    // Add as many stops as you need
  ]
}
```

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)

## Installation
Via NPM:
```bash
npm i --save flickity-transformer
```

Via download:
- Minified: [flickity-transformer.pkgd.min.js](https://unpkg.com/flickity-transformer@0.3.4/dist/flickity-transformer.pkgd.min.js)
- Un-minified: [flickity-transformer.pkgd.js](https://unpkg.com/flickity-transformer@0.3.4/dist/flickity-transformer.pkgd.js)

CDN:
```html
<!-- Minified -->
<script src="https://unpkg.com/flickity-transformer@0.3.4/dist/flickity-transformer.pkgd.min.js"></script>

<!-- Un-minified -->
<script src="https://unpkg.com/flickity-transformer@0.3.4/dist/flickity-transformer.pkgd.js"></script>
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
    name: 'scale',
    stops: [
      [-300, 0.5],
      [0, 1],
      [300, 0.5]
    ]
  },
  {
    name: 'rotate',
    stops: [
      [-300, -1],
      [300, 1]
    ]
  }
])
```

## Transforms
Each object in the transforms array requires at least two properties: `name` and `stops`. Each stop in `stops` is an array with two values: x position in pixels relative to the home position of your carousel, and the transform value to apply at that position.

| name          | type      | value             |
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

## Default units
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
[Basic CodePen demo](http://codepen.io/elcontraption/pen/RGPboR)

## Contributing
Contributions are welcome. To get up and running:

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
