# Flickity Transformer
*Transform your Flickity*

## Installation
Via NPM:

```bash
npm i --save flickity-transformer
```

## Usage
```js
var Flickity = require('flickity')
var FlickityTransformer = require('flickity-transformer')

var flckty = new Flickity('.carousel', {
  // options
})

// Create a new FlickityTransformer, passing in your Flickity instance and options object
var ftx = new FlickityTransformer(flckty, {
  transforms: [
    {
      property: 'scale',
      stops: [
        [-300, 0.5],
        [0, 1],
        [300, 0.5]
      ]
    },
    {
      property: 'rotate',
      stops: [
        [-300, -45],
        [0, 0],
        [300, 45]
      ]
    }
  ]
})
```

Set units:

```js
// Set `rotate` units to something other than the default `deg`:
ftx.units.rotate = 'rad'
```
