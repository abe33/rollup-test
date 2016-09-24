import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.es6',
  dest: 'lib/index.js',
  plugins: [
    nodeResolve({jsnext: true, main: false}),
    babel({babelrc: false})
  ],
  format: 'iife'
}
