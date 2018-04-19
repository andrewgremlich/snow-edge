import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'static/js/index.js',
  dest: 'static/js/index-bundled.js',
  format: 'iife',
  sourceMap: process.env.NODE_ENV === 'production' ? false : 'inline',
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
