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
- Minified: [flickity-transformer.pkgd.min.js](https://unpkg.com/flickity-transformer@0.1.6/dist/flickity-transformer.pkgd.min.js)
- Un-minified: [flickity-transformer.pkgd.js](https://unpkg.com/flickity-transformer@0.1.6/dist/flickity-transformer.pkgd.js)

CDN:
```html
<!-- Minified -->
<script src="https://unpkg.com/flickity-transformer@0.1.6/dist/flickity-transformer.pkgd.min.js"></script>

<!-- Un-minified -->
<script src="https://unpkg.com/flickity-transformer@0.1.6/dist/flickity-transformer.pkgd.js"></script>
```

## Usage
Create a new instance of FlickityTransformer, passing in your `flckty` instance and a configuration object that contains an array of `transforms`. Each transform should have a `name` property, corresponding to the transform function you want to use, and a `stops` array, containing at least two stops. Each stop is an array with two values: x position in pixels relative to the home position of your carousel, and the transform value to apply at that position.

```js
var Flickity = require('flickity')
var FlickityTransformer = require('flickity-transformer')

var flckty = new Flickity('.carousel', {
  // options
})

var ftx = new FlickityTransformer(flckty, {
  transforms: [
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
        [-300, -45],
        [300, 45]
      ]
    }
  ]
})
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
