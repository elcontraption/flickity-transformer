const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')

rollup.rollup({
  entry: 'src/index.js',
  plugins: [
    resolve()
  ]
}).then(bundle => {
  bundle.write({
    format: 'iife',
    moduleName: 'flickity-transformer',
    dest: 'dist/flickity-transformer.js'
  })

  bundle.write({
    format: 'iife',
    moduleName: 'FlickityTransformer',
    dest: 'test/functional/flickity-transformer.js'
  })
})
