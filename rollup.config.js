import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './static/js/index.js',
  output: {
    file: './static/js/index-bundled.js',
    sourceMap: process.env.NODE_ENV === 'production' ? false : 'inline',
    format: 'iife'
  },
  plugins: [
    eslint({
      exclude: [
        'static/css/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};
