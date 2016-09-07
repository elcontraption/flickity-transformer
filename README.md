# Flickity Transformer
*Transform your Flickity*

## Installation
Via NPM:

```bash
npm i --save flickity-transformer
```

## Usage
```js
var FlickityTransformer = require('flickity-transformer')

var flckty = new Flickity('.carousel', {
  // options
})

var ftx = new FlickityTransformer({
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

flckty.on('scroll', ftx.scroll)
```
