const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')

rollup.rollup({
  entry: 'src/index.js',
  plugins: [
    babel({
      presets: ['es2015-rollup'],
      babelrc: false
    }),
    resolve()
  ]
}).then(bundle => {
  bundle.write({
    format: 'cjs',
    moduleName: 'FlickityTransformer',
    dest: 'dist/flickity-transformer.js'
  })

  bundle.write({
    format: 'iife',
    moduleName: 'FlickityTransformer',
    dest: 'dist/flickity-transformer.pkgd.js'
  })

  bundle.write({
    format: 'iife',
    moduleName: 'FlickityTransformer',
    dest: 'test/functional/flickity-transformer.js'
  })
})
