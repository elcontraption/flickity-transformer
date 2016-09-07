# Flickity Transformer
*Transform your Flickity*

## Installation
Via NPM:

```bash
npm i --save flickity-transformer
```

## Usage
```js
var flickityTransformer = require('flickity-transformer')

var flckty = new Flickity('.carousel', {
  // options
})

flckty.on('scroll', function () {
  flickityTransformer({
    transforms: [
      {
        property: 'scale',
        stops: [
          [-300, 0.5],
          [0, 1],
          [300, 0.5]
        ]
      }
    ]
  })
})
```
