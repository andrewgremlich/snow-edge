import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './docs/js/index.js',
  output: {
    file: './docs/js/index-bundled.js',
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
    format: 'iife'
  },
  plugins: [
    eslint({
      exclude: [
        'docs/css/**',
      ]
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};
